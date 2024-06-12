import { completeUser } from '../schema/schema.js';

interface Builder {
	setUsername(username: string): UserBuilder;
	setEmail(email: string): UserBuilder;
	setPassword(password: string): UserBuilder;
    build(): completeUser;
}

export class UserBuilder implements Builder {
	private user: completeUser;

	constructor() {
		this.reset();
	}

	public reset(): void {
		this.user = {} as completeUser; 
	}

	public setUsername(username: string): UserBuilder {
		this.user.username = username;
		return this;
	}

    public setEmail(email: string): UserBuilder {
		this.user.email = email;
		return this;
	}

	public setPassword(password: string): UserBuilder {
		this.user.password = password;
		return this;
	}

	public build(): completeUser {
		const result = this.user;
		this.reset();
		return result;
	}
}

