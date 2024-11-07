<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;



class LiveDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('settings')->insert([
            'id' => 1,
            'name' => 'My Website',
            'email' => 'info@mywebsite.com',
            'phone' => '+1234567890',
            'address' => '123 Main Street, City, Country',
            'description' => 'This is a description of my website. It provides various services.',
            'facebook' => 'https://facebook.com/mywebsite',
            'instagram' => 'https://instagram.com/mywebsite',
            'youtube' => 'https://youtube.com/mywebsite',
            'google_map' => 'https://maps.google.com/?q=123+Main+Street+City+Country',
            'google_password' => 'your-google-password',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $colors = [
            ['id' => 1, 'name' => 'Red', 'hex_value' => '#FF5733', 'is_active' => true],
            ['id' => 2, 'name' => 'Green', 'hex_value' => '#33FF57', 'is_active' => true],
            ['id' => 3, 'name' => 'Blue', 'hex_value' => '#3357FF', 'is_active' => true],
            ['id' => 4, 'name' => 'Yellow', 'hex_value' => '#F1C40F', 'is_active' => true],
            ['id' => 5, 'name' => 'Purple', 'hex_value' => '#9B59B6', 'is_active' => true],
            ['id' => 6, 'name' => 'Teal', 'hex_value' => '#1ABC9C', 'is_active' => true],
            ['id' => 7, 'name' => 'Light Red', 'hex_value' => '#E74C3C', 'is_active' => true],
            ['id' => 8, 'name' => 'Sky Blue', 'hex_value' => '#3498DB', 'is_active' => true],
            ['id' => 9, 'name' => 'Emerald Green', 'hex_value' => '#2ECC71', 'is_active' => true],
            ['id' => 10, 'name' => 'Dark Blue', 'hex_value' => '#34495E', 'is_active' => true],
        ];
        

        // Bulk insert colors
        DB::table('colors')->insert($colors);

        $categories = [
            ['id'=>1, 'name' => 'Electronics', 'slug' => Str::slug('Electronics'), 'is_active' => true],
            ['id'=>2, 'name' => 'Fashion', 'slug' => Str::slug('Fashion'), 'is_active' => true],
            ['id'=>3, 'name' => 'Furniture', 'slug' => Str::slug('Furniture'), 'is_active' => true],
            ['id'=>4, 'name' => 'Books', 'slug' => Str::slug('Books'), 'is_active' => true],
            ['id'=>5, 'name' => 'Toys', 'slug' => Str::slug('Toys'), 'is_active' => true],
        ];

        DB::table('categories')->insert($categories);

        $subcategories = [
            ['category_id' => 1, 'name' => 'Mobile Phones', 'slug' => Str::slug('Mobile Phones'), 'is_active' => true],
            ['category_id' => 1, 'name' => 'Laptops', 'slug' => Str::slug('Laptops'), 'is_active' => true],
            ['category_id' => 1, 'name' => 'Cameras', 'slug' => Str::slug('Cameras'), 'is_active' => true],
            ['category_id' => 2, 'name' => 'Men\'s Clothing', 'slug' => Str::slug('Men\'s Clothing'), 'is_active' => true],
            ['category_id' => 2, 'name' => 'Women\'s Clothing', 'slug' => Str::slug('Women\'s Clothing'), 'is_active' => true],
            ['category_id' => 3, 'name' => 'Living Room Furniture', 'slug' => Str::slug('Living Room Furniture'), 'is_active' => true],
            ['category_id' => 3, 'name' => 'Office Furniture', 'slug' => Str::slug('Office Furniture'), 'is_active' => true],
            ['category_id' => 4, 'name' => 'Fiction', 'slug' => Str::slug('Fiction'), 'is_active' => true],
            ['category_id' => 4, 'name' => 'Non-fiction', 'slug' => Str::slug('Non-fiction'), 'is_active' => true],
            ['category_id' => 5, 'name' => 'Action Figures', 'slug' => Str::slug('Action Figures'), 'is_active' => true],
            ['category_id' => 5, 'name' => 'Board Games', 'slug' => Str::slug('Board Games'), 'is_active' => true],
        ];
        DB::table('subcategories')->insert($subcategories);

        $brands = [
            ['name' => 'Apple', 'slug' => Str::slug('Apple'), 'is_active' => true],
            ['name' => 'Samsung', 'slug' => Str::slug('Samsung'), 'is_active' => true],
            ['name' => 'Sony', 'slug' => Str::slug('Sony'), 'is_active' => true],
            ['name' => 'LG', 'slug' => Str::slug('LG'), 'is_active' => true],
            ['name' => 'Nokia', 'slug' => Str::slug('Nokia'), 'is_active' => true],
            ['name' => 'Huawei', 'slug' => Str::slug('Huawei'), 'is_active' => true],
            ['name' => 'Dell', 'slug' => Str::slug('Dell'), 'is_active' => true],
            ['name' => 'HP', 'slug' => Str::slug('HP'), 'is_active' => true],
            ['name' => 'Lenovo', 'slug' => Str::slug('Lenovo'), 'is_active' => true],
            ['name' => 'Xiaomi', 'slug' => Str::slug('Xiaomi'), 'is_active' => true],
        ];

        // Bulk insert brands
        DB::table('brands')->insert($brands);

        // producvts
        $products = [
            ['name'=> 'Mobile SAmsung', 'slug'=> Str::slug('mobile-samsung'), 'category_id'=> 1, 'subcategory_id'=> 1, 'brand_id'=> 2, 'price'=> 1000, 'is_active'=> true],
            ['name'=> 'Mobile Apple', 'slug'=> Str::slug('mobile-apple'), 'category_id'=> 1, 'subcategory_id'=> 1, 'brand_id'=> 1, 'price'=> 1200, 'is_active'=> true],
            ['name'=> 'Mobile Nokia', 'slug'=> Str::slug('mobile-nokia'), 'category_id'=> 1, 'subcategory_id'=> 1, 'brand_id'=> 5, 'price'=> 800, 'is_active'=> true],
            ['name'=> 'Laptop Dell', 'slug'=> Str::slug('laptop-dell'), 'category_id'=> 1, 'subcategory_id'=> 2, 'brand_id'=> 7, 'price'=> 1500, 'is_active'=> true],
            ['name'=> 'Laptop HP', 'slug'=> Str::slug('laptop-hp'), 'category_id'=> 1, 'subcategory_id'=> 2, 'brand_id'=> 8, 'price'=> 1300, 'is_active'=> true],
            ['name'=> 'Laptop Lenovo', 'slug'=> Str::slug('laptop-lenovo'), 'category_id'=> 1, 'subcategory_id'=> 2, 'brand_id'=> 9, 'price'=> 1400, 'is_active'=> true],
            ['name'=> 'Camera Sony', 'slug'=> Str::slug('camera-sony'), 'category_id'=> 1, 'subcategory_id'=> 3, 'brand_id'=> 3, 'price'=> 900, 'is_active'=> true],
            ['name'=> 'Camera Nikon', 'slug'=> Str::slug('camera-nikon'), 'category_id'=> 1, 'subcategory_id'=> 3, 'brand_id'=> 5, 'price'=> 800, 'is_active'=> true],
            ['name'=> 'Camera Canon', 'slug'=> Str::slug('camera-canon'), 'category_id'=> 1, 'subcategory_id'=> 3, 'brand_id'=> 5, 'price'=> 850, 'is_active'=> true],
            ['name'=> 'Men\'s Shirt', 'slug'=> Str::slug('mens-shirt'), 'category_id'=> 1, 'subcategory_id'=> 4, '  brand_id'=> 1, 'price'=> 50, 'is_active'=> true],
            ['name'=> 'Men\'s Trousers', 'slug'=> Str::slug('mens-trousers'), 'category_id'=> 1, 'subcategory_id'=> 4, '  brand_id'=> 1, 'price'=> 60, 'is_active'=> true],
            ['name'=> 'Men\'s Shoes', 'slug'=> Str::slug('mens-shoes'), 'category_id'=> 1, 'subcategory_id'=> 4, '  brand_id'=> 1, 'price'=> 70, 'is_active'=> true],
            ['name'=> 'Women\'s Dress', 'slug'=> Str::slug('womens-dress'), 'category_id'=> 1, 'subcategory_id'=> 5, '  brand_id'=> 1, 'price'=> 80, 'is_active'=> true],
            ['name'=> 'Women\'s Skirt', 'slug'=> Str::slug('womens-skirt'), 'category_id'=> 1, 'subcategory_id'=> 5, '  brand_id'=> 1, 'price'=> 70, 'is_active'=> true],
            ['name'=> 'Women\'s Shoes', 'slug'=> Str::slug('womens-shoes'), 'category_id'=> 1, 'subcategory_id'=> 5, '  brand_id'=> 1, 'price'=> 90, 'is_active'=> true],
            ['name'=> 'Sofa Set', 'slug'=> Str::slug('sofa-set'), 'category_id'=> 1, 'subcategory_id'=> 6, '  brand_id'=> 1, 'price'=> 500, 'is_active'=> true],
            ['name'=> 'Office Chair', 'slug'=> Str::slug('office-chair'), 'category_id'=> 1, 'subcategory_id'=> 6, '  brand_id'=> 1, 'price'=> 200, 'is_active'=> true],
            ['name'=> 'Book Fiction', 'slug'=> Str::slug('book-fiction'), 'category_id'=> 1, 'subcategory_id'=> 7, '  brand_id'=> 1, 'price'=> 20, 'is_active'=> true],
            ['name'=> 'Book Non-fiction', 'slug'=> Str::slug('book-non-fiction'), 'category_id'=> 1, 'subcategory_id'=> 7, '  brand_id'=> 1, 'price'=> 25, 'is_active'=> true],
            ['name'=> 'Action Figure Superman', 'slug'=> Str::slug('action-figure-superman'), 'category_id'=> 1, 'subcategory_id'=> 8, '  brand_id'=> 1, 'price'=> 10, 'is_active'=> true],
            ['name'=> 'Action Figure Batman', 'slug'=> Str::slug('action-figure-batman'), 'category_id'=> 1, 'subcategory_id'=> 8, '  brand_id'=> 1, 'price'=> 10, 'is_active'=> true],
            ['name'=> 'Board Game Chess', 'slug'=> Str::slug('board-game-chess'), 'category_id'=> 1, 'subcategory_id'=> 9, '  brand_id'=> 1, 'price'=> 15, 'is_active'=> true],
            ['name'=> 'Board Game Ludo', 'slug'=> Str::slug('board-game-ludo'), 'category_id'=> 1, 'subcategory_id'=> 9, '  brand_id'=> 1, 'price'=> 10, 'is_active'=> true],
        ];

        // Bulk insert products
        DB::table('products')->insert($products);

        $specificationHeaders = [
            ['id' => 1, 'name' => 'Dimensions'],
            ['id' => 2, 'name' => 'Weight'],
            ['id' => 3, 'name' => 'Material'],
            ['id' => 4, 'name' => 'Color'],
            ['id' => 5, 'name' => 'Battery Life'],
            ['id' => 6, 'name' => 'Warranty'],
            ['id' => 7, 'name' => 'Storage Capacity'],
            ['id' => 8, 'name' => 'Operating System'],
            ['id' => 9, 'name' => 'Display Size'],
            ['id' => 10, 'name' => 'Processor'],
        ];

        DB::table('product_specification_headers')->insert($specificationHeaders);

        $subheaders = [
            // Dimensions subheaders
            ['header_id' => 1, 'name' => 'Length'],
            ['header_id' => 1, 'name' => 'Width'],
            ['header_id' => 1, 'name' => 'Height'],

            // Weight subheaders
            ['header_id' => 2, 'name' => 'Weight (kg)'],
            ['header_id' => 2, 'name' => 'Weight (lbs)'],

            // Material subheaders
            ['header_id' => 3, 'name' => 'Material Type'],
            ['header_id' => 3, 'name' => 'Material Thickness'],

            // Color subheaders
            ['header_id' => 4, 'name' => 'Primary Color'],
            ['header_id' => 4, 'name' => 'Secondary Color'],

            // Battery Life subheaders
            ['header_id' => 5, 'name' => 'Battery Capacity'],
            ['header_id' => 5, 'name' => 'Battery Life (hours)'],

            // Warranty subheaders
            ['header_id' => 6, 'name' => 'Warranty Period'],
            ['header_id' => 6, 'name' => 'Warranty Type'],

            // Storage Capacity subheaders
            ['header_id' => 7, 'name' => 'Storage (GB)'],
            ['header_id' => 7, 'name' => 'Expandable Storage'],

            // Operating System subheaders
            ['header_id' => 8, 'name' => 'OS Version'],
            ['header_id' => 8, 'name' => 'OS Type'],

            // Display Size subheaders
            ['header_id' => 9, 'name' => 'Screen Size'],
            ['header_id' => 9, 'name' => 'Screen Resolution'],

            // Processor subheaders
            ['header_id' => 10, 'name' => 'Processor Model'],
            ['header_id' => 10, 'name' => 'Processor Speed'],
        ];

        // Bulk insert product specification subheaders
        DB::table('product_specification_subheaders')->insert($subheaders);
    }
}
