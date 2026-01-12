// import { Hono } from "hono";
// import withPrisma from "../../lib/prisma.js";
// import { authAdminMiddleware } from "../../middlewares/middleware.js";
// import { NewsService } from "../../services/news/news-service.js";
// import type { ContextWithPrisma } from "../../types/context.js";

// export const NewsController = new Hono<ContextWithPrisma>();

// // ===============================
// // GET ALL NEWS
// // ===============================
// NewsController.get("/news", withPrisma, async (c) => {
//   const prisma = c.get("prisma");
//   const response = await NewsService.GetAllNews(prisma);
//   return c.json(response, 200);
// });

// // ===============================
// // GET NEWS BY ID
// // ===============================
// NewsController.get("/news/:id", withPrisma, async (c) => {
//   const prisma = c.get("prisma");
//   const id_news = Number(c.req.param("id"));
//   const response = await NewsService.GetNewsById(prisma, id_news);
//   return c.json(response, 200);
// });

// // ===============================
// // CREATE NEWS
// // ===============================
// NewsController.post(
//   "/news",
//   authAdminMiddleware,
//   withPrisma,
//   async (c) => {
//     const prisma = c.get("prisma");
//     const body = await c.req.parseBody();

//     const response = await NewsService.CreateNews(prisma, body);
//     return c.json(response, 201);
//   }
// );

// // ===============================
// // UPDATE NEWS
// // ===============================
// NewsController.patch(
//   "/news/:id",
//   authAdminMiddleware,
//   withPrisma,
//   async (c) => {
//     const prisma = c.get("prisma");
//     const id_news = Number(c.req.param("id"));
//     const body = await c.req.parseBody();

//     const response = await NewsService.UpdateNewsById(
//       prisma,
//       id_news,
//       body
//     );
//     return c.json(response, 200);
//   }
// );

// // ===============================
// // DELETE NEWS
// // ===============================
// NewsController.delete(
//   "/news/:id",
//   authAdminMiddleware,
//   withPrisma,
//   async (c) => {
//     const prisma = c.get("prisma");
//     const id_news = Number(c.req.param("id"));

//     const response = await NewsService.DeleteNewsById(
//       prisma,
//       id_news
//     );
//     return c.json(response, 200);
//   }
// );
