<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class BrandController extends Controller
{

    public function index(Request $request)
    {

        try {
            $perPage = $request->input('per_page', 10);
            $sortBy = $request->input('sort_by', 'created_at');
            $sortOrder = $request->input('sort_order', 'desc');

            $query = Brand::query();

            // Apply keyword filtering if provided
            if ($request->filled('keyword')) {
                $keyword = $request->input('keyword');
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', '%' . $keyword . '%')
                        ->orWhere('description', 'like', '%' . $keyword . '%');
                });
            }

            // Apply sorting
            $query->orderBy($sortBy, $sortOrder);

            // Paginate the results
            $items = $query->paginate($perPage);


            return apiResponse([
                'status' => true,
                'message' => 'Categories retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => BrandResource::collection($items),
                    'pagination' =>  $items->count() > 0 ? paginate($items) : null
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving categories',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }


    public function store(Request $request)
    {

        DB::beginTransaction();
        try {
            $data = [
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'is_active' => $request->is_active ?? true,
            ];

            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'categories'); // 'categories' is the folder for storing brand images
            }

            $brand = Brand::create($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Brand created successfully',
                'data' => new BrandResource($brand),
                'statusCode' => Response::HTTP_CREATED,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Brand creation failed',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }


    public function show(string $id)
    {
        try {
            $brand = Brand::findOrFail($id);

            return apiResponse([
                'status' => true,
                'message' => 'Brand retrieved successfully',
                'data' => new BrandResource($brand),
            ]);
        } catch (ModelNotFoundException $e) {
            // If brand not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Brand not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving the brand',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }


    public function update(Request $request, string $id)
    {

        DB::beginTransaction();
        try {
            $brand = Brand::findOrFail($id);

            $data = $request->only(['description', 'is_active']);

            if ($request->filled('name')) {
                $data['name'] = $request->name;
                $data['slug'] = Str::slug($request->name);
            }

            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'categories'); // Update with new image
            } elseif ($request->filled('remove_image')) {
                $data['image'] = null; // Remove the image
            } else {
                $data['image'] = $brand->image; // Keep the existing image
            }

            // Update the brand with the provided data
            $brand->update($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Brand updated successfully',
                'data' => new BrandResource($brand),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Brand not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating the brand',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }


    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $brand = Brand::findOrFail($id);
            $brand->update(['is_active' => false]);

            $brand->delete();
            DB::commit();

            // Return success response
            return apiResponse([
                'status' => true,
                'message' => 'Brand deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            // If brand not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Brand not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            // For any other exception, return internal server error
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while deleting the brand',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    public function trash(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $items = Brand::onlyTrashed()->orderBy('deleted_at', 'desc')->paginate($perPage);

            return apiResponse([
                'status' => true,
                'message' => 'Deleted categories retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => BrandResource::collection($items),
                    'pagination' =>  $items->count() > 0 ? paginate($items) : null
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving deleted categories',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
    public function restore(string $id)
    {
        DB::beginTransaction();
        try {
            $brand = Brand::onlyTrashed()->findOrFail($id);

            $brand->update(['is_active' => true]);

            $brand->restore();
            DB::commit();

            // Return success response
            return apiResponse([
                'status' => true,
                'message' => 'Brand restored successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            // If brand not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Brand not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            // For any other exception, return internal server error
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while restoring the brand',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    public function getBrandList()
    {
        try {
            $items = Brand::select('name', 'id')->where('is_active', true)->get();

            if ($items->isEmpty()) {
                return apiResponse([
                    'status' => false,
                    'message' => 'No brand found',
                    'statusCode' => Response::HTTP_NOT_FOUND,
                ]);
            }

            return apiResponse([
                'status' => true,
                'message' => 'Categories retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => BrandResource::collection($items),
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving categories',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
