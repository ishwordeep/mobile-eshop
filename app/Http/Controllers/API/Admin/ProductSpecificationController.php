<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductSpecificationHeaderResource;
use App\Models\ProductSpecificationHeader;
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
                'name' => $request->input('name'),
            ]);

            if ($request->filled('subheaders')) {
                $subheaders = $request->input('subheaders');
                foreach ($subheaders as $subheader) {
                    $header->subheaders()->create([
                        'name' => $subheader['name'],
                    ]);
                }
            }

            DB::commit();

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
