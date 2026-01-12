import { PrismaClient } from "../generated/prisma/client.js";

export class CarouselRepository {
  static async addCarouselImage(
    prisma: PrismaClient,
    newsId: number,
    url: string,
    publicId: string
  ) {
    return prisma.newsCarousel.create({
      data: {
        newsId,
        image_url: url,
        public_id: publicId,
      },
    });
  }
}
