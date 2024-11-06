<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
    }
}
