<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ColorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'label' => $this->name,
            'hex_value' => $this->hex_value,
            'is_active' => $this->is_active,
        ];
        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        return $data;
    }
}
