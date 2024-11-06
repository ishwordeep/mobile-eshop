<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        "name",
        "email",
        "phone",
        "address",
        "description",
        "facebook",
        "instagram",
        "youtube",
        "google_map",
        "google_password",
    ];
}
