import { PrismaClient } from "../../generated/prisma/client.js";
import { NewsValidation } from "../../validations/news/news-validation.js";

export class NewsRepository {
 static getAllNews(prisma: PrismaClient) {
  return prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    include: { carousels: true }, 
  });
}

static createNews(
  prisma: PrismaClient,
  data: {
    title: string
    content: string
    image_news?: string | null
    image_news_public_id?: string | null
  }
) {
  return prisma.news.create({
    data,
  });
}

static updateNewsById (
  prisma: PrismaClient,
  data: { 
    id: number
    title?: string
    content?: string
    image_news?: string | null
    image_news_public_id?: string | null
  }
) {
  return prisma.news.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content,
      image_news: data.image_news,
      image_news_public_id: data.image_news_public_id
    }
  });
}
  static async updateMainImage(
    prisma: PrismaClient,
    newsId: number,
    url: string,
    publicId: string
  ) {
    return prisma.news.update({
      where: { id: newsId },
      data: {
        image_news: url,
        image_news_public_id: publicId,
      },
    });
  }
}
