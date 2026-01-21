import z from 'zod';

export class videoValidation {

    static readonly CREATE = z.object({
        title_video: z.preprocess(
            (v) => (v == null ? '' : v),
            z.string()
                .min(3, 'Title Video must be at least 3 characters long')
                .max(100, 'Title Video maximum 100 characters'),
        ),
        link_video: z.preprocess(
            (v) => (v == null ? '' : v),
            z.string()
                .min(10, 'Link Video must be at least 10 characters long')
                .max(200, 'Link Video maximum 200 characters'),
        ),
    }).strict();

    static readonly UPDATE = z.object({
        title_video: z.preprocess(
            (v) => (v == null ? undefined : v),
            z.string()
                .min(3, 'Title Video must be at least 3 characters long')
                .max(100, 'Title Video maximum 100 characters')
                .optional(),
        ),
        link_video: z.preprocess(
            (v) => (v == null ? undefined : v),
            z.string()
                .min(10, 'Link Video must be at least 10 characters long')
                .max(200, 'Link Video maximum 200 characters')
                .optional(),
        ),
    }).strict();
}