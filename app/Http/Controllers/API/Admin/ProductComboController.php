<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductComboResource;
use App\Models\ProductCombo;
use App\Models\ProductComboItem;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ProductComboController extends Controller
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

            $query = ProductCombo::query();
            $query->with('products');

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
                'message' => 'Categories retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => ProductComboResource::collection($items),
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'name' => $request->name,
                'price' => $request->price,
                'is_active' => $request->is_active??true,
            ];

            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'combo'); // 'categories' is the folder for storing category images
            }

            $combo = ProductCombo::create($data);


            if ($request->has('products')) {
                foreach ($request->products as $product) {
                    ProductComboItem::create([
                        'product_id' => $product,
                        'product_combo_id' => $combo->id
                    ]);
                }
            }

            DB::commit();

            $combo->load('products');

            return apiResponse([
                'status' => true,
                'message' => 'Combo created successfully',
                'data' => new ProductComboResource($combo),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while creating combo',
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
            $combo = ProductCombo::with('products')->find($id);
            return apiResponse([
                'status' => true,
                'message' => 'Combo retrieved successfully',
                'data' => new ProductComboResource($combo),
            ]);
        } catch (ModelNotFoundException $e) {
            return apiResponse([
                'status' => false,
                'message' => 'Combo not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving combo',
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
            $item = ProductCombo::finfOrFail($id);
            $data = $request->only(['name', 'price','is_active']);

            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'combo'); // Update with new image
            } elseif ($request->filled('deleted_image')) {
                $data['image'] = null; // Remove the image
            } else {
                $data['image'] = $item->image; // Keep the existing image
            }

            $item->update($data);

            if ($request->has('products')) {
                $item->products()->delete();
                foreach ($request->products as $product) {
                    ProductComboItem::create([
                        'product_id' => $product,
                        'product_combo_id' => $item->id
                    ]);
                }
            }



            DB::commit();
            $item->load('products');
            return apiResponse([
                'status' => true,
                'message' => 'Combo updated successfully',
                'data' => new ProductComboResource($item)
            ]);
        } catch (ModelNotFoundException $e) {

            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Combo not found',
                'statusCode' => Response::HTTP_NOT_FOUND
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating combo',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try{
            $item = ProductCombo::findOrFail($id);
            $item->delete();
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Combo deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Combo not found',
                'statusCode' => Response::HTTP_NOT_FOUND
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while deleting combo',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }
}
