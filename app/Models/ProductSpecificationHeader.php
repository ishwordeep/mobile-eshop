<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSpecificationHeader extends Model
{
    protected $fillable = [
        "name",
    ];

    public function subheaders()
    {
        return $this->hasMany(ProductSpecificationSubheader::class,"header_id");
    }

    public function details()
    {
        return $this->hasMany(ProductSpecificationDetail::class);
    }
}
