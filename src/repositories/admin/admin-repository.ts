import type { PrismaClient } from '../../generated/prisma/client.js';
import type { Prisma } from '../../generated/prisma/client.js';

export class AdminRepository {

  static countByNameAdmin(
    prisma: PrismaClient,
    name_admin: string,
  ) {
    return prisma.admin.count({
      where: { name_admin },
    });
  }

  static createAdmin(
    prisma: PrismaClient,
    data: Prisma.AdminCreateInput,
  ) {
    return prisma.admin.create({ data });
  }

  static findByNameAdmin(
    prisma: PrismaClient,
    name_admin: string,
  ) {
    return prisma.admin.findFirst({
      where: { name_admin },
    });
  }

  static getAllAdmin(
    prisma: PrismaClient,
  ) {
    return prisma.admin.findMany();
  }

  static findByIdAdmin(
    prisma: PrismaClient,
    id: number,
  ) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  static updateByIdAdmin(
    prisma: PrismaClient,
    id: number,
    data: Prisma.AdminUpdateInput,
  ) {
    return prisma.admin.update({
      where: { id },
      data,
    });
  }

  static deleteByIdAdmin(
    prisma: PrismaClient,
    id: number,
  ) {
    return prisma.admin.delete({
      where: { id },
    });
  }
}
