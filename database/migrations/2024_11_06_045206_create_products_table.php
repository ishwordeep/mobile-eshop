<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('subcategory_id')->nullable();
            $table->string('name');
            $table->decimal('price', 10, 3)->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('available_qty')->nullable();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->string('video')->nullable();
            $table->integer('discount')->nullable();

            $table->boolean('is_new')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('brand_id')->references('id')->on('brands')->onUpdate('cascade')->onDelete('cascade');

            $table->index('name');
            $table->index('category_id');
            $table->index('subcategory_id');
            $table->index('brand_id');
        });

        Schema::create('product_specification_headers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('product_specification_subheaders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('header_id')->constrained('product_specification_headers')->onDelete('cascade');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('product_specifications_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('header_id')->constrained('product_specification_headers')->onDelete('cascade');
            $table->foreignId('subheader_id')->constrained('product_specification_subheaders')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('specification');
            $table->timestamps();
        });


        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });

        Schema::create('product_colors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('color_id')->constrained('colors')->onDelete('cascade'); // assuming a colors table exists
            $table->foreignId('variant_id')->constrained('product_variants')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('product_color_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_color_id')->constrained('product_colors')->onDelete('cascade');
            $table->string('image'); // path or filename of the image
            $table->timestamps();
        });

        // Schema::create('product_combos', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->decimal('price', 10, 2);
        //     $table->string('image')->nullable();
        //     $table->timestamps();
        // });

        // Schema::create('product_combo_items', function (Blueprint $table) {
        //     $table->id();
        //     $table->foreignId('product_combo_id')->constrained('product_combos')->onDelete('cascade');
        //     $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
        //     $table->timestamps();
        // });

        // Schema::create('delivery_charges', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('address');
        //     $table->decimal('charge', 10, 2);
        //     $table->timestamps();
        // });

        // Schema::create('repair_details', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('repair_number')->unique();
        //     $table->string('device_name')->nullable();
        //     $table->string('device_model')->nullable();
        //     $table->string('device_imei')->nullable();
        //     $table->string('device_password')->nullable();
        //     $table->string('device_issue')->nullable();
        //     $table->string('device_accessories')->nullable();
        //     $table->string('device_color')->nullable();
        //     $table->string('device_storage')->nullable();
        //     $table->string('device_condition')->nullable();
        //     $table->enum('status', ['pending', 'in_progress', 'completed', 'delivered'])->default('pending');
        //     $table->text('remarks')->nullable();

        //     $table->string('customer_name')->nullable();
        //     $table->string('customer_phone')->nullable();
        //     $table->string('customer_email')->nullable();
        //     $table->string('customer_address')->nullable();
        //     $table->timestamps();
        // });

        // Schema::create('product_specifications', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name')->nullable();
        //     $table->unsignedBigInteger('product_id')->nullable();
        //     $table->string('specification')->nullable();
        //     $table->timestamps();

        //     $table->foreign('product_id')->references('id')->on('products')->onUpdate('cascade')->onDelete('cascade');
        // });

        // Schema::create('product_property_sizes', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('product_property_id')->nullable();
        //     $table->unsignedBigInteger('size_id')->nullable();
        //     $table->integer('price')->nullable();

        //     $table->timestamps();
        //     $table->foreign('product_property_id')->references('id')->on('product_properties')->onUpdate('cascade')->onDelete('cascade');
        //     $table->foreign('size_id')->references('id')->on('sizes')->onUpdate('cascade')->onDelete('cascade');
        // });
        // Schema::create('product_property_images', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('product_property_id')->nullable();
        //     $table->string('image')->nullable();

        //     $table->timestamps();
        //     $table->foreign('product_property_id')->references('id')->on('product_properties')->onUpdate('cascade')->onDelete('cascade');
        // });
        // Schema::create('product_images', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('product_id')->nullable();
        //     $table->string('image')->nullable();

        //     $table->timestamps();
        //     $table->foreign('product_id')->references('id')->on('products')->onUpdate('cascade')->onDelete('cascade');
        // });

        // Schema::create('product_reviews', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('product_id')->nullable();
        //     $table->unsignedBigInteger('user_id')->nullable();
        //     $table->text('review')->nullable();
        //     $table->integer('rating')->nullable();
        //     $table->boolean('is_active')->default(true);
        //     $table->timestamps();

        //     $table->foreign('product_id')->references('id')->on('products')->onUpdate('cascade')->onDelete('cascade');
        //     $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
