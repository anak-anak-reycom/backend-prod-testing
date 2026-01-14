import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { CarouselNewsService } from '../../services/carousel/carousel-service.js';
import type { ContextWithPrisma } from '../../types/context.js';
import { toAllCarouselResponse } from '../../models/carousel/carousel-model.js';

export const CarouselController = new Hono<ContextWithPrisma>();

// ===============================
// GET ALL CAREERS
// ===============================
CarouselController.get('/news/carousel', withPrisma, async (c) => {
    const prisma = c.get('prisma');
        const response = await CarouselNewsService.getAllCarousel(prisma);
        return c.json(toAllCarouselResponse(
            response,
            "Get All Carousel Successfully"
        ));
})  