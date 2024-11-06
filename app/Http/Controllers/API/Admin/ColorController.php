<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
                'message' => 'Categories retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => ColorResource::collection($items),
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
