<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $permissions = $this->getPermissionsViaRoles();
        $role = $this->roles()->first();
        $roleName = $role->name ?? "undefined";
        $role_id = $role->id ??  null;

        return [
            "id" => $this->id,
            "email" => $this->email,
            "name" => $this->name,
            "role" => $roleName,
            "role_id" => $role_id,
            "permissions" => $permissions
        ];
    }
}
