<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductSpecificationHeaderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id, // The header's ID
            'header' => $this->name, // The header's name
            'subheaders' => ProductSpecificationSubheaderResource::collection($this->whenLoaded('subheaders')), // Eager-loaded subheaders
        ];
    }
}
