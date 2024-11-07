<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSpecificationDetail extends Model
{
    protected $fillable = [
        "header_id",
        "subheader_id",
        "product_id",
        "specification"
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function header()
    {
        return $this->belongsTo(ProductSpecificationHeader::class);
    }

    public function subheader()
    {
        return $this->belongsTo(ProductSpecificationSubheader::class);
    }
}
