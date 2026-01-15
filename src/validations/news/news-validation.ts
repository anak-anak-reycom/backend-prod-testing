import z from "zod"

export class NewsValidation {
    static readonly CREATE = z.object({
        title: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Title must be at least 1 character long').max(100, 'Title maximum 100 characters'),
              ),
        content: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Content must be at least 1 character long'),
              ),
        image_news: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Image must be at least 1 character long'),
              ),
    })

    static readonly UPDATE = z.object({
       title: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Title must be at least 1 character long').max(100, 'Title maximum 100 characters'),
              ).optional(),
        content: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Content must be at least 1 character long'),
              ).optional(),
        image_news: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Image must be at least 1 character long'),
              ).optional(),
        date_news: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Date must be at least 1 character long'),
              ).optional(),
    })
}