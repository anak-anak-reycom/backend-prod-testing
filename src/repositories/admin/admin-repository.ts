import type { PrismaClient } from '../../generated/prisma/client.js';
import type { Prisma } from '../../generated/prisma/client.js';

export class AdminRepository {

  static countByName(
    prisma: PrismaClient,
    name_admin: string,
  ) {
    return prisma.admin.count({
      where: { name_admin },
    });
  }

  static create(
    prisma: PrismaClient,
    data: Prisma.AdminCreateInput,
  ) {
    return prisma.admin.create({ data });
  }

  static findByName(
    prisma: PrismaClient,
    name_admin: string,
  ) {
    return prisma.admin.findFirst({
      where: { name_admin },
    });
  }

  static findById(
    prisma: PrismaClient,
    id: number,
  ) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  static updateById(
    prisma: PrismaClient,
    id: number,
    data: Prisma.AdminUpdateInput,
  ) {
    return prisma.admin.update({
      where: { id },
      data,
    });
  }

  static deleteById(
    prisma: PrismaClient,
    id: number,
  ) {
    return prisma.admin.delete({
      where: { id },
    });
  }

  static findAll(
    prisma: PrismaClient,
  ) {
    return prisma.admin.findMany();
  }
}
