import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { VideoService } from '../../services/videos/video-service.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const VideoController = new Hono<ContextWithPrisma>();

// ===============================
// GET ALL VIDEOS
// ===============================
VideoController.get('/videos', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await VideoService.getAllVideos(prisma);
    return c.json(response, 200);
})

// ===============================
// GET VIDEO BY ID
// ===============================
VideoController.get('/videos/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_video = Number(c.req.param('id'));
    const response = await VideoService.getVideoById(prisma, id_video);
    return c.json(response, 200);
})

// ===============================
// CREATE VIDEO
// ===============================
VideoController.post('/videos', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const request = await c.req.json();
    const response = await VideoService.createVideo(prisma, request);
    return c.json(response, 201);
})

// ===============================
// UPDATE VIDEO BY ID
// ===============================
VideoController.patch('/videos/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_video = Number(c.req.param('id'));
    const request = await c.req.json();
    const data = { id: id_video, ...request };
    const response = await VideoService.updateVideoById(prisma, data);
    return c.json(response, 200);
})

// ===============================
// DELETE VIDEO BY ID
// ===============================
VideoController.delete('/videos/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_video = Number(c.req.param('id'));
    const response = await VideoService.deleteVideoById(prisma, id_video);
    return c.json(response, 200);
})