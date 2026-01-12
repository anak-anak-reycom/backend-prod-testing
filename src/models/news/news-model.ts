import type { News, NewsCarousel } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateNewsRequest = {
  title: string;
  content: string;
};

/* =======================
   DATA RESPONSE
======================= */

export type NewsData = {
  id: number;
  title: string;
  content: string;
  image_news?: string;
  image_news_public_id?: string;
  created_at: Date;
  updated_at: Date;
};

export type NewsCarouselData = {
  id: number;
  image_carousel: string;
  image_carousel_public_id: string;
  created_at: Date;
  updated_at: Date;
};

export type AllNewsData = {
  news: NewsData[];
  news_carousel: NewsCarouselData[];
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
  message: string;
  data: T;
};

/* =======================
   MAPPERS
======================= */

export function toNewsData(news: News): NewsData {
  return {
    id: news.id,
    title: news.title,
    content: news.content,
    image_news: news.image_news ?? undefined,
    image_news_public_id: news.image_news_public_id ?? undefined,
    created_at: news.createdAt,
    updated_at: news.updatedAt,
  };
}

export function toNewsCarouselData(
  carousel: NewsCarousel
): NewsCarouselData {
  return {
    id: carousel.id,
    image_carousel: carousel.image_url,
    image_carousel_public_id: carousel.public_id,
    created_at: carousel.createdAt,
    updated_at: carousel.updatedAt,
  };
}

/* =======================
   RESPONSE WRAPPERS
======================= */

export function toCreateNewsResponse(
  news: News,
  message: string
): ApiResponse<NewsData> {
  return {
    message,
    data: toNewsData(news),
  };
}

export function toAllNewsResponse(
  news: News[],
  carousels: NewsCarousel[],
  message: string
): ApiResponse<AllNewsData> {
  return {
    message,
    data: {
      news: news.map(toNewsData),
      news_carousel: carousels.map(toNewsCarouselData),
    },
  };
}
