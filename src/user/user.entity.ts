import { hash, compare } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _userName: string,
		private readonly passwordHash?: string,
	) {}

	get email(): string {
		return this._email;
	}
	get userName(): string {
		return this._userName;
	}
	get password(): string {
		return this._password;
	}

	public async setPassword(password: string, salt: string): Promise<void> {
		this._password = await hash(password, Number.parseInt(salt));
	}

	public async checkPassword(checkablePassword: string): Promise<boolean> {
		if (this.passwordHash) {
			return compare(checkablePassword, this.passwordHash);
		}
		return false;
	}
}
