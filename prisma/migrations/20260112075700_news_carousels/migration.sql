/*
  Warnings:

  - You are about to drop the `news` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "news";

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_news" TEXT,
    "image_news_public_id" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCarousel" (
    "id" SERIAL NOT NULL,
    "newsId" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsCarousel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsCarousel" ADD CONSTRAINT "NewsCarousel_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
