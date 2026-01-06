import type { Admin } from "../../generated/prisma/client.js";


export type CreateAdminRequest = {
    name_admin: string;
    email: string;
    password: string;
}

export type LoginAdminRequest = {
    name_admin: string;
    password: string;
}

export type AdminResponse = {
    id_admin: number;
    name_admin: string;
    email: string;
    token?: string;
}

export function toAdminResponse(admin: Admin, token: string): AdminResponse {
    return {
        id_admin: admin.id,
        name_admin: admin.name_admin,
        email: admin.email,
    }
}