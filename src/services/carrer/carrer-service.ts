import type { PrismaClient, Prisma } from "../../generated/prisma/client.js";
import { HTTPException } from "hono/http-exception";
import { CareerRepository } from "../../repositories/career/career-repository.js";
import {
  type CareerWithCategoryData,
  type ApiResponse,
  toCareerListResponse,
  toCareerResponse,
} from "../../models/career/career-model.js";

export class CareerService {

  // ===============================
  // CREATE CAREER
  // ===============================
  static async CreateCareer(
    prisma: PrismaClient,
    request: {
      categoryId?: number;
    },
    data: {
      jobName: string;
      jobDate: Date;
      jobDescription?: string;
      jobResponbilities?: string;
      jobRequirement?: string;
    }
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const total = await CareerRepository.countByNameCareer(
      prisma,
      data.jobName,
    );

    if (total !== 0) {
      throw new HTTPException(400, {
        message: 'Career with the same name already exists',
      });
    }

    if (request.categoryId !== undefined) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: request.categoryId },
      });

      if (!categoryExists) {
        throw new HTTPException(404, {
          message: 'Category not found',
        });
      }
    }

    const career = await CareerRepository.createCareer(prisma, {
      job_name: data.jobName,
      job_date: data.jobDate,
      description: data.jobDescription || null,
      responbilities: data.jobResponbilities || null,
      requirement: data.jobRequirement || null,
      ...(request.categoryId !== undefined && {
        category: {
          connect: { id: request.categoryId },
        },
      }),
    });

    return toCareerResponse(career, 'Career created successfully');
  }


  // ===============================
  // GET ALL CAREERS
  // ===============================
  static async GetAllCareers(
    prisma: PrismaClient,
  ): Promise<ApiResponse<CareerWithCategoryData[]>> {

    const careers = await CareerRepository.findAll(prisma);

    const total = careers.length;
    const page = 1;
    const limit = total;

    return toCareerListResponse(careers, "Get all careers successfully", page, limit, total);
  }

  // ===============================
  // GET CAREER BY ID
  // ===============================
  static async GetCareerById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const career = await CareerRepository.findCareerById(prisma, id);

    if (!career) {
      throw new HTTPException(404, {
        message: "Career not found",
      });
    }

    return toCareerResponse(career, "Get career successfully");
  }

  // ===============================
  // UPDATE CAREER
  // ===============================
  static async UpdateCareerById(
    prisma: PrismaClient,
    id: number,
    request: {
      jobName?: string;
      jobDescription?: string;
      jobResponbilities?: string;
      jobRequirement?: string;
      categoryId?: number | null;
    },
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const career = await CareerRepository.findCareerById(prisma, id);

    if (!career) {
      throw new HTTPException(404, { message: 'Career not found' });
    }

    if (request.categoryId !== undefined && request.categoryId !== null) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: request.categoryId },
      });

      if (!categoryExists) {
        throw new HTTPException(400, {
          message: 'Category not found',
        });
      }
    }

    const updated = await CareerRepository.updateCareerById(prisma, id, {
      ...(request.jobName && { job_name: request.jobName }),
      ...(request.jobDescription !== undefined && { description: request.jobDescription }),
      ...(request.jobResponbilities !== undefined && { responbilities: request.jobResponbilities }),
      ...(request.jobRequirement !== undefined && { requirement: request.jobRequirement }),
      ...(request.categoryId !== undefined && {
        category:
          request.categoryId === null
            ? { disconnect: true }
            : { connect: { id: request.categoryId } },
      }),
    });

    return toCareerResponse(updated, 'Career updated successfully');
  }


  // ===============================
  // DELETE CAREER
  // ===============================
  static async DeleteCareerById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const existing = await CareerRepository.findCareerById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: "Career not found",
      });
    }

    await CareerRepository.deleteById(prisma, id);

    return toCareerResponse(existing, "Career deleted successfully");
  }
}

