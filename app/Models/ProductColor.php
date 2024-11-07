<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductColor extends Model
{
    protected $fillable = ['product_id', 'color_id', 'variant_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function color(){
        return $this->belongsTo(Color::class);
    }

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function images()
    {
        return $this->hasMany(ProductColorImage::class);
    }

}
