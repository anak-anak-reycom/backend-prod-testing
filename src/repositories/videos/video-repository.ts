import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";

export class VideoRepository {
    static async countByTitleVideo(
        prisma: PrismaClient,
        title_video: string,
    ) {
        return prisma.videos.count({
            where: { title_video },
        });
    }
}