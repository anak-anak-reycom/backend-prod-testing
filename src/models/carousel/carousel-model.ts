import type { NewsCarousel } from "../../generated/prisma/client.js";

/* =======================
   DATA RESPONSE
======================= */
export type CarouselData = {
  id: number;
  image_carousel: string;
  image_carousel_public_id: string;
  created_at: Date;
  updated_at: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
  message: string;
  data: T;
};

/* =======================
   MAPPER
======================= */
export function toCarouselData(carousel: NewsCarousel): CarouselData {
  return {
    id: carousel.id,
    image_carousel: carousel.image_url,
    image_carousel_public_id: carousel.public_id,
    created_at: carousel.createdAt,
    updated_at: carousel.updatedAt,
  };
}

/* =======================
   RESPONSE WRAPPER
======================= */
export function toAllCarouselResponse(
  carousels: NewsCarousel[],
  message: string
): ApiResponse<CarouselData[]> {
  return {
    message,
    data: carousels.map(toCarouselData),
  };
}
