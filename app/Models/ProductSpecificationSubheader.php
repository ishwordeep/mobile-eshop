<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSpecificationSubheader extends Model
{
    protected $fillable = [
        "header_id",
        "name"
    ];

    public function header()
    {
        return $this->belongsTo(ProductSpecificationHeader::class);
    }

    public function details()
    {
        return $this->hasMany(ProductSpecificationDetail::class);
    }
}
