<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }
}
