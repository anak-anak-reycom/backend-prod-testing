import type { PrismaClient } from "../../generated/prisma/client.js";
import { uploadImageService } from "../../upload/upload-service.js";
import { NewsRepository } from "../../repositories/news-repository.js";
import { CarouselRepository } from "../../repositories/newsCarousel-repository.js";

export class NewsService {
  static async createNews(
    prisma: PrismaClient,
    title: string,
    content: string
  ) {
    return NewsRepository.createNews(prisma, title, content);
  }

  static async uploadMainImage(
    prisma: PrismaClient,
    newsId: number,
    file: File
  ) {
    const upload = await uploadImageService(file);

    return NewsRepository.updateMainImage(
      prisma,
      newsId,
      upload.url,
      upload.public_id
    );
  }

  static async uploadCarouselImages(
    prisma: PrismaClient,
    newsId: number,
    files: File[]
  ) {
    for (const file of files) {
      const upload = await uploadImageService(file);

      await CarouselRepository.addCarouselImage(
        prisma,
        newsId,
        upload.url,
        upload.public_id
      );
    }
  }

}

