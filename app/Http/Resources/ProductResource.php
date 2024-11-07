<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'available_qty' => $this->available_qty,
            'image' => $this->image,
            'brand' => new BrandResource($this->whenLoaded('brand')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'subcategory' => new SubCategoryResource($this->whenLoaded('subcategory')),
            'tag' => ProductTag::collection($this->whenLoaded('tags')),
            'is_active' => $this->is_active,
        ];
    }
}
