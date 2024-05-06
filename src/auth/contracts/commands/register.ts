import { z } from 'zod';
import {
	CHECK_PASSWORD_REGEX,
	INVALID_EMAIL_MESSAGE,
	NO_MATCH_PASSWORD_REGEX_MESSAGE,
} from '../../constants/contracts-commands.constants';

export const RegisterRequestSchema = z.object({
	email: z.string().email({ message: INVALID_EMAIL_MESSAGE }),
	password: z.string().regex(CHECK_PASSWORD_REGEX, { message: NO_MATCH_PASSWORD_REGEX_MESSAGE }),
	userName: z.string(),
});

export const RegisterResponseSchema = z.object({
	accessToken: z.string(),
});

export type UserRegisterRequest = z.infer<typeof RegisterRequestSchema>;

export type UserRegisterResponse = z.infer<typeof RegisterResponseSchema>;
