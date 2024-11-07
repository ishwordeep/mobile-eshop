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
            ['id' => 1, 'hex_value' => '#FF5733', 'is_active' => true],  // Red
            ['id' => 2, 'hex_value' => '#33FF57', 'is_active' => true],  // Green
            ['id' => 3, 'hex_value' => '#3357FF', 'is_active' => true],  // Blue
            ['id' => 4, 'hex_value' => '#F1C40F', 'is_active' => true],  // Yellow
            ['id' => 5, 'hex_value' => '#9B59B6', 'is_active' => true],  // Purple
            ['id' => 6, 'hex_value' => '#1ABC9C', 'is_active' => true],  // Teal
            ['id' => 7, 'hex_value' => '#E74C3C', 'is_active' => true],  // Light Red
            ['id' => 8, 'hex_value' => '#3498DB', 'is_active' => true],  // Sky Blue
            ['id' => 9, 'hex_value' => '#2ECC71', 'is_active' => true],  // Emerald Green
            ['id' => 10, 'hex_value' => '#34495E', 'is_active' => true], // Dark Blue
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
