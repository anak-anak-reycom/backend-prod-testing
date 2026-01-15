import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateAdminRequest,
  type LoginAdminRequest,
  type AdminData,
  type ApiResponse,
  toAdminResponse,
  toAdminListResponse,
} from '../../models/admin/admin-model.js';

import { adminValidation } from '../../validations/admin/admin-validation.js';
import { HTTPException } from 'hono/http-exception';
import bcrypt from 'bcrypt';
import { generateAdminToken } from '../../utils/jwt.js';
import { AdminRepository } from '../../repositories/admin/admin-repository.js';

export class AdminService {

  // ===============================
  // CREATE ADMIN
  // ===============================
  static async CreateAdmin(
    prisma: PrismaClient,
    request: CreateAdminRequest,
  ): Promise<ApiResponse<AdminData>> {

    const validated = adminValidation.CREATE.parse(request);

    const total = await AdminRepository.countByName(
      prisma,
      validated.name_admin,
    );

    if (total !== 0) {
      throw new HTTPException(400, {
        message: 'Admin with the same name already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const admin = await AdminRepository.create(prisma, {
      ...validated,
      password: hashedPassword,
    });

    return toAdminResponse(admin, 'Admin created successfully');
  }

  // ===============================
  // LOGIN ADMIN
  // ===============================
  static async LoginAdmin(
    prisma: PrismaClient,
    request: LoginAdminRequest,
  ): Promise<ApiResponse<AdminData>> {

    const validated = adminValidation.LOGIN.parse(request);

    const admin = await AdminRepository.findByName(
      prisma,
      validated.name_admin,
    );

    if (!admin) {
      throw new HTTPException(401, {
        message: 'Invalid name or password',
      });
    }

    const isValid = await bcrypt.compare(
      validated.password,
      admin.password,
    );

    if (!isValid) {
      throw new HTTPException(401, {
        message: 'Invalid name or password',
      });
    }

    const token = generateAdminToken({
      id: admin.id,
      name_admin: admin.name_admin,
    });

    await AdminRepository.updateById(prisma, admin.id, {
      token,
    });

    return toAdminResponse(admin, 'Login successful', token);
  }

  // ===============================
  // LOGOUT ADMIN
  // ===============================
  static async LogoutAdmin(
    prisma: PrismaClient,
    adminId: number,
  ): Promise<ApiResponse<AdminData>> {

    const admin = await AdminRepository.findById(prisma, adminId);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    await AdminRepository.updateById(prisma, adminId, {
      token: null,
    });

    return toAdminResponse(admin, 'Logout successful');
  }

  // ===============================
  // UPDATE ADMIN
  // ===============================
  static async UpdateAdminById(
    prisma: PrismaClient,
    id: number,
    request: Partial<CreateAdminRequest>,
  ): Promise<ApiResponse<AdminData>> {

    const validated = adminValidation.UPDATE.parse(request);

    if (Object.keys(validated).length === 0) {
      throw new HTTPException(400, {
        message: 'Minimum one field is required to update admin',
      });
    }

    const admin = await AdminRepository.findById(prisma, id);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    const updated = await AdminRepository.updateById(
      prisma,
      id,
      validated,
    );

    return toAdminResponse(updated, 'Admin updated successfully');
  }

  // ===============================
  // DELETE ADMIN
  // ===============================
  static async DeleteAdminById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<AdminData>> {

    const admin = await AdminRepository.findById(prisma, id);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    await AdminRepository.deleteById(prisma, id);

    return toAdminResponse(admin, 'Admin deleted successfully');
  }

  // ===============================
  // GET ALL ADMINS
  // ===============================
  static async GetAllAdmins(
    prisma: PrismaClient,
  ): Promise<ApiResponse<AdminData[]>> {

    const admins = await AdminRepository.findAll(prisma);

    return toAdminListResponse(admins, 'Get all admins successfully');
  }

  // ===============================
  // GET ADMIN BY ID
  // ===============================
  static async GetAdminById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<AdminData>> {

    const admin = await AdminRepository.findById(prisma, id);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin with this id not found',
      });
    }

    return toAdminResponse(admin, 'Get admin successfully');
  }
}
