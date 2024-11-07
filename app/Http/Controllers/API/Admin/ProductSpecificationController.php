<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductSpecificationHeaderResource;
use App\Models\ProductSpecificationHeader;
use App\Models\ProductSpecificationSubheader;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ProductSpecificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input("per_page", 10);
            $sortBy = $request->input("sort_by", "created_at");
            $sortOrder = $request->input("sort_order", "desc");

            $query = ProductSpecificationHeader::query();
            $query->with('subheaders');

            if ($request->filled('keyword')) {
                $keyword = $request->input('keyword');
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', '%' . $keyword . '%');
                });
            }

            $query->orderBy($sortBy, $sortOrder);

            $items = $query->paginate($perPage);

            return apiResponse([
                'success' => true,
                'message' => 'Product Specification retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => ProductSpecificationHeaderResource::collection($items), // Return the product resources collection
                    'pagination' => $items->count() > 0 ? paginate($items) : null, // Return pagination data if applicable
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving products specifications',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $header = ProductSpecificationHeader::create([
                'name' => $request->input('header'),
            ]);

            if ($request->filled('subheaders')) {
                $subheaders = $request->input('subheaders');
                foreach ($subheaders as $subheader) {
                    ProductSpecificationSubheader::create([
                        'header_id' => $header->id,
                        'name' => $subheader,
                    ]);
                }
            }

            DB::commit();

            // load subheaders/
            $header->load('subheaders');

            return apiResponse([
                'success' => true,
                'message' => 'Product Specification created successfully',
                'data' => new ProductSpecificationHeaderResource($header),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'success' => false,
                'message' => 'An error occurred while creating product specification',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $item = ProductSpecificationHeader::with('subheaders')->findOrFail($id);
            return apiResponse([
                'success' => true,
                'message' => 'Product Specification retrieved successfully',
                'data' => new ProductSpecificationHeaderResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            return apiResponse([
                'success' => false,
                'message' => 'Product Specification not found',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'success' => false,
                'message' => 'An error occurred while retrieving product specification',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $header = ProductSpecificationHeader::findOrFail($id);

            $header->update([
                'name' => $request->input('header'),
            ]);

            if ($request->filled('subheaders')) {
                $subheaders = $request->input('subheaders');
                // delete all old subheaders and store new
                $header->subheaders()->delete();
                foreach ($subheaders as $subheader) {
                    ProductSpecificationSubheader::create([
                        'header_id' => $header->id,
                        'name' => $subheader,
                    ]);
                }
            }

            DB::commit();

            // Load updated subheaders
            $header->load('subheaders');

            return apiResponse([
                'success' => true,
                'message' => 'Product Specification updated successfully',
                'data' => new ProductSpecificationHeaderResource($header),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Category not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'success' => false,
                'message' => 'An error occurred while updating product specification',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $header = ProductSpecificationHeader::findOrFail($id);
            $header->subheaders()->delete();
            $header->delete();
            DB::commit();
            return apiResponse([
                'success' => true,
                'message' => 'Product Specification deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'success' => false,
                'message' => 'Product Specification not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'success' => false,
                'message' => 'An error occurred while deleting product specification',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
