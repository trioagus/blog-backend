import {z, ZodType} from "zod";

export const userValidation: ZodType = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(50, { message: "Username must be at most 50 characters long" }),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(50, { message: "Email must be at most 50 characters long" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be at most 50 characters long" })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
            message: "Password must contain at least one letter, one number, and one special character",
        }),
})