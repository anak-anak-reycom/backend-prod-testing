import z from "zod"

export class NewsCarouselValidation {
    static readonly CREATE = z.object({
        image_url: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Image must be at least 1 character long'),
              ),
    })

    static readonly UPDATE = z.object({
       image_url: z.preprocess(
                (v) => (v == null ? '' : v),
                z.string().min(1, 'Image must be at least 1 character long'),
              ),
    })
}