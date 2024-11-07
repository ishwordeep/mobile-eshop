<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductComboItem extends Model
{
    protected $fillable = ['product_combo_id', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function combo()
    {
        return $this->belongsTo(ProductCombo::class);
    }
}
