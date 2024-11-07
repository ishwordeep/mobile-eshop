<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        "name",
        "category_id",
        "subcategory_id",
        "brand_id",
        "price",
        "description",
        "available_qty",
        "image",
        "video",
        "discount",
        "is_new",
        "is_featured",
        "is_active",
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function tags(){
        return $this->hasMany(ProductTag::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    } 

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function colors()
    {
        return $this->hasMany(ProductColor::class);
    }
    public function specifications()
    {
        return $this->hasMany(ProductSpecificationDetail::class);
    }

    public function colorImages()
    {
        return $this->hasManyThrough(ProductColorImage::class, ProductColor::class);
    }



}
