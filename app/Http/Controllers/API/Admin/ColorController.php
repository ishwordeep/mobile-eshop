<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $sortBy = $request->input('sort_by', 'created_at');
            $sortOrder = $request->input('sort_order', 'desc');

            $query = Color::query();

            // Apply keyword filtering if provided
            if ($request->filled('keyword')) {
                $keyword = $request->input('keyword');
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', '%' . $keyword . '%');
                });
            }

            // Apply sorting
            $query->orderBy($sortBy, $sortOrder);

            // Paginate the results
            $items = $query->paginate($perPage);


            return apiResponse([
                'status' => true,
                'message' => 'Color retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => ColorResource::collection($items),
                    'pagination' =>  $items->count() > 0 ? paginate($items) : null
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving color',
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
            $data = [
                'name' => $request->name,
                'hex_value' => $request->hex_value,
                'is_active' => $request->is_active ?? true,
            ];


            $color = Color::create($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Color created successfully',
                'data' => new ColorResource($color),
                'statusCode' => Response::HTTP_CREATED,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Color creation failed',
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
            $color = Color::findOrFail($id);

            return apiResponse([
                'status' => true,
                'message' => 'Color retrieved successfully',
                'data' => new ColorResource($color),
            ]);
        } catch (ModelNotFoundException $e) {
            // If color not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Color not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving the color',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $color = Color::findOrFail($id);

            $data = $request->only(['name', 'is_active','hex_value']);

          

            // Update the color with the provided data
            $color->update($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Color updated successfully',
                'data' => new ColorResource($color),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Color not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating the color',
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
            $color = Color::findOrFail($id);
            $color->update(['is_active' => false]);

            $color->delete();
            DB::commit();

            // Return success response
            return apiResponse([
                'status' => true,
                'message' => 'Color deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            // If color not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Color not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            // For any other exception, return internal server error
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while deleting the color',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    public function getColorList(){
        try {
            $items = Color::select('hex_value', 'id','name')->where('is_active', true)->get();

            // check if the category list is empty
            if($items->isEmpty()) {
                return apiResponse([
                    'status' => false,
                    'message' => 'No color found',
                    'statusCode' => Response::HTTP_NOT_FOUND,
                ]);
            }

            return apiResponse([
                'status' => true,
                'message' => 'Color retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => ColorResource::collection($items),
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving color',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
    
}
