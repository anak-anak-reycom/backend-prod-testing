import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { AdminService } from '../../services/admin/admin-service.js';

import type { ContextWithPrisma } from '../../types/context.js';

export const AdminController = new Hono<ContextWithPrisma>();

AdminController.post('/admin', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const request = await c.req.json();

  const response = await AdminService.CreateAdmin(prisma, request);
  return c.json(response, 201);
});

AdminController.get('/admin', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const response = await AdminService.GetAllAdmins(prisma);
  return c.json(response, 200);
})


