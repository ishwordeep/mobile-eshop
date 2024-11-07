<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductColorImage;
use App\Models\ProductImage;
use App\Models\ProductSpecificationDetail;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            // Set the per page, sort by, and sort order from the request
            $perPage = $request->input('per_page', 10);
            $sortBy = $request->input('sort_by', 'created_at');
            $sortOrder = $request->input('sort_order', 'desc');

            // Start the query for the Product model
            $query = Product::query();

            // Apply keyword filtering if provided
            if ($request->filled('keyword')) {
                $keyword = $request->input('keyword');
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', '%' . $keyword . '%')
                        ->orWhere('description', 'like', '%' . $keyword . '%');
                });
            }

            // Apply category filter if provided
            if ($request->filled('category_id')) {
                $query->where('category_id', $request->input('category_id'));
            }

            // Apply subcategory filter if provided
            if ($request->filled('subcategory_id')) {
                $query->where('subcategory_id', $request->input('subcategory_id'));
            }

            // Apply brand filter if provided
            if ($request->filled('brand_id')) {
                $query->where('brand_id', $request->input('brand_id'));
            }

            // Apply active filter if provided
            if ($request->filled('is_active')) {
                $query->where('is_active', $request->input('is_active'));
            }

            // Apply sorting
            $query->orderBy($sortBy, $sortOrder);

            // Paginate the results
            $items = $query->paginate($perPage);

            // Return the response with data
            return apiResponse([
                'status' => true,
                'message' => 'Products retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => ProductResource::collection($items), // Return the product resources collection
                    'pagination' => $items->count() > 0 ? paginate($items) : null, // Return pagination data if applicable
                ]
            ]);
        } catch (\Exception $e) {
            // If an error occurs, return an error response
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving products',
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
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'category_id' => $request->category_id,
                'subcategory_id' => $request->subcategory_id,
                'brand_id' => $request->brand_id,
                'price' => $request->price,
                'discount' => $request->discount_percentage,
                'available_qty' => $request->available_qty,
                'video' => $request->video,
                'is_active' => $request->is_active ?? true,
            ];
            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'products'); // 'categories' is the folder for storing category images
            }
            $product = Product::create($data);

            // PRODUCT_TAGS
            if ($request->has('tags')) {
                foreach ($request->tags as $tag) {
                    $product->tags()->create([
                        'tag' => $tag,
                    ]);
                }
            }

            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Product created successfully',
                'data' => new ProductResource($product),
                'statusCode' => Response::HTTP_CREATED,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while creating product',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    public function storeProductImage(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);
            if ($request->has('images')) {
                foreach ($request->images as $image) {
                    $product->productImages()->create([
                        'image' => storeImage($image, 'products'),
                    ]);
                }
            }

            if ($request->has('deleted_images')) {
                foreach ($request->deleted_images as $imageId) {
                    ProductImage::where('id', $imageId)->delete();
                }
            }
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Product image added successfully',
                'data' => new ProductResource($product),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Product not found',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while adding product image',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    public function storeSpecification(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);
            if ($request->has('specifications')) {
                foreach ($request->specifications as $specification) {
                    ProductSpecificationDetail::create([
                        'product_id' => $product->id,
                        'header_id' => $specification['header'],
                        'subheader_id' => $specification['subheader'],
                        'specification' => $specification['value'],
                    ]);
                }
            }
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Product specification added successfully',
                'data' => new ProductResource($product),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Product not found',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while adding product specification',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    public function storeVariant(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);
            if ($request->has('variants')) {
                foreach ($request->variants as $variant) {
                    $variant = ProductVariant::create([
                        'product_id' => $product->id,
                        'name' => $variant['name'],
                        'price' => $variant['price'],
                    ]);
                }
            }
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Product variant added successfully',
                'data' => new ProductResource($product),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Product not found',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while adding product variant',
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
            $item = Product::with(['category', 'subcategory', 'brand', 'productImages', 'variants', 'colors', 'specifications', 'colorImages'])->findOrFail($id);
            return apiResponse([
                'status' => true,
                'message' => 'Product retrieved successfully',
                'data' => new ProductResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            return apiResponse([
                'status' => false,
                'message' => 'Product not found',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving product',
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            // Find the product by ID
            $product = Product::findOrFail($id);

            // Delete related records (images, specifications, tags, etc.)
            $product->productImages()->delete();
            $product->tags()->delete();
            $product->specifications()->delete();
            $product->variants()->delete();
            $product->colors()->delete();
            $product->colorImages()->delete();

            // Delete the product itself
            $product->delete();

            DB::commit();

            // Return a success response
            return response()->json([
                'status' => true,
                'message' => 'Product deleted successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();

            // Return an error response
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while deleting the product',
                'errors' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
