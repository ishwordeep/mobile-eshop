<?php

use App\Http\Controllers\API\Admin\BrandController;
use App\Http\Controllers\API\Admin\CategoryController;
use App\Http\Controllers\API\Admin\ColorController;
use App\Http\Controllers\API\Admin\ProductController;
use App\Http\Controllers\API\Admin\ProductSpecificationController;
use App\Http\Controllers\API\Admin\SettingController;
use App\Http\Controllers\API\Admin\SizeController;
use App\Http\Controllers\API\Admin\SubcategoryController;
use App\Http\Controllers\API\Admin\SwitchActiveStatusController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Middleware\CheckSuperadmin;
use App\Http\Middleware\CheckSuperadminOrAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




//Protected API Routes
// Route::middleware(['auth:sanctum', 'verified'])->group(function () {
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/user', 'user');
        Route::post('/profile-update', 'profileUpdate');
        Route::post('/change-password',  'changePassword');
        Route::post('update-profile-picture', 'updateProfilePicture');
    });

    Route::get('/auth-test', function (Request $request) {
        return response()->json([
            'success' => true,
            'message' => 'Protected API is working fine'
        ]);
    });

    Route::middleware([CheckSuperadmin::class])->group(function () {
        Route::get('users-list', [ProfileController::class, 'usersList']);
    });


    // Super Admin & Admin Accessible Routes 
    Route::prefix('admin')->middleware([CheckSuperadminOrAdmin::class])->group(function () {
        Route::controller(CategoryController::class)->group(function () {
            Route::post('/category', 'store');
            Route::get('/category', 'index');
            Route::get('/category/trash', 'trash');
            Route::get('/category/list', 'getCategoryList');
            Route::get('/category/{id}', 'show');
            Route::post('/category/{id}', 'update');
            Route::delete('/category/{id}', 'destroy');
            Route::post('/category/{id}/restore', 'restore');
        });
        Route::controller(SubcategoryController::class)->group(function () {
            Route::post('/subcategory', 'store');
            Route::get('/subcategory', 'index');
            Route::get('/subcategory/trash', 'trash');
            Route::get('/subcategory/list/{category_id}', 'getSubcategoryList');
            Route::get('/subcategory/{id}', 'show');
            Route::post('/subcategory/{id}', 'update');
            Route::delete('/subcategory/{id}', 'destroy');
            Route::post('/subcategory/{id}/restore', 'restore');
        });
        Route::controller(BrandController::class)->group(function () {
            Route::post('/brand', 'store');
            Route::get('/brand', 'index');
            Route::get('/brand/list', 'getBrandList');
            Route::get('/brand/{id}', 'show');
            Route::post('/brand/{id}', 'update');
            Route::delete('/brand/{id}', 'destroy');
        });
        Route::controller(ColorController::class)->group(function () {
            Route::post('/color', 'store');
            Route::get('/color', 'index');
            Route::get('/color/list', 'getColorList');
            Route::get('/color/{id}', 'show');
            Route::post('/color/{id}', 'update');
            Route::delete('/color/{id}', 'destroy');
        });
        Route::controller(SizeController::class)->group(function () {
            Route::post('/size', 'store');
            Route::get('/size', 'index');
            Route::get('/size/{id}', 'show');
            Route::post('/size/{id}', 'update');
            Route::delete('/size/{id}', 'destroy');
        });
        Route::controller(SettingController::class)->group(function () {
            Route::get('/setting', 'index');
            Route::post('/setting', 'update');
        });

        Route::controller(ProductController::class)->group(function () {
            Route::post('/product', 'store');
            Route::get('/product', 'index');
            Route::get('/product/{id}', 'show');
            Route::post('/product/{id}', 'update');
            Route::delete('/product/{id}', 'destroy');
        });
        Route::controller(ProductSpecificationController::class)->group(function () {
            Route::post('/specification', 'store');
            Route::get('/specification', 'index');
            Route::get('specification/header/list', 'getHeaderList');
            Route::get('specification/subheader/list/{header_id}', 'getSubHeaderList');
            Route::get('/specification/{id}', 'show');
            Route::post('/specification/{id}', 'update');
            Route::delete('/specification/{id}', 'destroy');
        });
        Route::post('/toggle-status/{modelName}/{id}', [SwitchActiveStatusController::class, 'toggleStatus']);
    });
});



//Public API Routes

Route::get('/test', function (Request $request) {
    return response()->json([
        'success' => true,
        'message' => 'API is working fine'
    ]);
});



require __DIR__ . '/auth.php';
