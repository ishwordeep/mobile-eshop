<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCombo extends Model
{
    protected $fillable = ['name', 'price', 'image','is_active'];

    public function products()
    {
        return $this->hasMany(ProductComboItem::class);
    }
}
