<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;


class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $item = Setting::findOrFail(1);

            return apiResponse([
                'status' => true,
                'message' => 'Setting retrieved successfully',
                'data' => new SettingResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            // If setting not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Setting not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving the setting',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }


    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $item = Setting::findOrFail(1);

            $data = $request->only([
                'name',
                'email',
                'phone',
                'address',
                'description',
                'facebook',
                'instagram',
                'youtube',
                'google_map',
                'google_password',
            ]);

            // Update the setting with the provided data
            $item->update($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Setting updated successfully',
                'data' => new SettingResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Setting not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating the setting',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
