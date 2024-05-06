import { z } from 'zod';
import {
	CHECK_PASSWORD_REGEX,
	INVALID_EMAIL_MESSAGE,
	NO_MATCH_PASSWORD_REGEX_MESSAGE,
} from '../../constants/contracts-commands.constants';

export const LoginRequestSchema = z.object({
	email: z.string().email({ message: INVALID_EMAIL_MESSAGE }),
	password: z.string().regex(CHECK_PASSWORD_REGEX, { message: NO_MATCH_PASSWORD_REGEX_MESSAGE }),
});

export const LoginResponseSchema = z.object({
	accessToken: z.string(),
});

export type UserLoginRequest = z.infer<typeof LoginRequestSchema>;

export type UserLoginResponse = z.infer<typeof LoginResponseSchema>;
