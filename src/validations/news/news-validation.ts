import z from "zod"

export class NewsValidation {
    static readonly CREATE = z.object({
        title_news: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Title must be at least 1 character long').max(100, 'Title maximum 100 characters'),
              ),
        content_news: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Content must be at least 1 character long'),
              ),
        image_news: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Image must be at least 1 character long'),
              ),
        date_news: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Date must be at least 1 character long'),
              ),
        is_archived: z.preprocess(
                (v) => (v == null ? false : v),
                z.boolean(),
              ).optional(),
    })
}