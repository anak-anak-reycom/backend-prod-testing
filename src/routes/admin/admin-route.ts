import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { AdminController } from '../../controllers/admin/admin-controller.js';
import type ContextWithPrisma  from '../../index.js';

export const adminRoute = new Hono<typeof<ContextWithPrisma>();

adminRoute.post('/admin', withPrisma, AdminController.create);
