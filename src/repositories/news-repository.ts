import { PrismaClient } from "../generated/prisma/client.js";

export class NewsRepository {
  static createNews(prisma: PrismaClient, title: string, content: string) {
      throw new Error("Method not implemented.");
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
