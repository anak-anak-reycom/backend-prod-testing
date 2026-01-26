import type { PrismaClient } from "../../generated/prisma/client.js";
import { uploadImageService } from "../../upload/upload-service.js";
import { NewsRepository } from "../../repositories/news/news-repository.js";
import { CarouselRepository } from "../../repositories/carousel/newsCarousel-repository.js";

export class NewsService {

  // =====================
  // CREATE NEWS ONLY
  // =====================
  static async createNews(
    prisma: PrismaClient,
    data: {
      title: string
      content: string
      image_news?: string | null
      image_news_public_id?: string | null
    }
  ) {
    return NewsRepository.createNews(prisma, data);
  }

  // =====================
  // GET ALL NEWS
  // =====================
  static async getAllNews(prisma: PrismaClient) {
    return NewsRepository.getAllNews(prisma);
  }

  // =====================
  // UPDATE NEWS BY ID
  // =====================
  static async updateNewsById(
    prisma: PrismaClient,
    data: {
      id: number
      title?: string
      content?: string
      image_news?: string | null
      image_news_public_id?: string | null
    }
  ) {
    const { id, ...updateData } = data;
    return NewsRepository.updateNewsById(prisma, id, updateData);
  }
  // =====================

  // =====================
  // UPLOAD MAIN IMAGE ONLY
  // =====================
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

  // =====================
  // CREATE NEWS + UPLOAD IMAGES
  // =====================
  static async createNewsWithImages(
    prisma: PrismaClient,
    payload: {
      title: string
      content: string
      mainImage?: File
      carouselImages?: File[]
    }
  ) {
    
    let imageUrl: string | null = null;
    let publicId: string | null = null;

    if (payload.mainImage) {
      const upload = await uploadImageService(payload.mainImage);
      imageUrl = upload.url;
      publicId = upload.public_id;
    }

    const news = await NewsRepository.createNews(prisma, {
      title: payload.title,
      content: payload.content,
      image_news: imageUrl,
      image_news_public_id: publicId,
    });

    if (payload.carouselImages && payload.carouselImages.length > 0) {
      for (const file of payload.carouselImages) {
        const upload = await uploadImageService(file);

        await CarouselRepository.addCarouselImage(
          prisma,
          news.id,
          upload.url,
          upload.public_id
        );
      }
    }

    return news;
  }
}
