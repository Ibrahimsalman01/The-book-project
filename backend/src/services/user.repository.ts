import { drizzle } from "drizzle-orm/node-postgres";
import { Users, completeUser } from '../schema/schema.js';
import { sql, getTableColumns, eq  } from 'drizzle-orm';
import { DatabaseService } from "../utils/config.js";
import bcrypt from 'bcrypt';

export class UserRepository {
  private db = DatabaseService.drizzleInit();

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; //used to determine time it takes to hash a password
    //higher num -> higher time it takes to compute and longer hashing process
    // 10 is default used value
    return bcrypt.hash(password, saltRounds);
  }

  public async registerUser(currUser: completeUser): Promise<void> {
    try {
      const existingUsername = await this.db
      .select({userId: Users.userId})
      .from(Users)
      .where(eq(Users.username, currUser.username))

      if (existingUsername.length > 0) {
        throw new Error(`Username "${currUser.username}" is already taken.`);
      }

      const existingEmail = await this.db
        .select({ userId: Users.userId })
        .from(Users)
        .where(eq(Users.email, currUser.email));

      if (existingEmail.length > 0) {
        throw new Error(`Email "${currUser.email}" is already taken.`);
      }

      if (!this.isValidEmail(currUser.email)) {
        throw new Error(`Email "${currUser.email}" is not valid.`);
      }

      const hashedPassword = await this.hashPassword(currUser.password);
      currUser.password = hashedPassword;

      await this.db.insert(Users).values(currUser);
        
    } catch (error) {
      console.error(`Unable to register new user due to: ${error}`);
    }
  }

  public async loginUser(currEmail: string, currPassword: string) {
    try {
      //not official just testing password check
    const checkUser = await this.db.select({
      userId: Users.userId,
      username: Users.username,
      email: Users.email,
      password: Users.password
      }
    )
    .from(Users)
    .where(eq(Users.email, currEmail));

    console.log(checkUser)

    if (checkUser.length === 0) {
      throw new Error('Invalid email or password.');
    }

    console.log("Password checker: "+ await bcrypt.compare(currPassword, checkUser[0].password))

    if (!(await bcrypt.compare(currPassword, checkUser[0].password))) {
      throw new Error('Invalid password.');
    }
    
    console.log("SUCCESSFULLY LOGGED IN")
  }
  catch (error) {
    console.error(`Unable to login due to: ${error}`);
  }
}
      

  public async updateUser() {
    //could be tricky in future so leaving it for later
  }

  public async deleteUser(currUserId: number) {
    const result = await this.db
      .delete(Users)
      .where(eq(Users.userId, currUserId))
      .returning({ userId: Users.userId });

    return result[0].userId;
  }

}
