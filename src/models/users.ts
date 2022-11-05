import executeQuery from "../database";
import bcrypt from "bcrypt";

const pepper = "abcdegh";
const saltRounds = process.env.SALT as string;
export type User = {
    id?: number;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        const sql = "select * from users";
        return await executeQuery(sql, []);
    }
    async show(id: number): Promise<User> {
        const sql = "select * from users where id = ($1)";
        const result = await executeQuery(sql, [id]);
        return result[0];
    }
    async create(user: User): Promise<User> {
        const sql = "INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *";
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
        const result = await executeQuery(sql, [user.username, user.first_name, user.last_name, hash]);
        return result[0];
    }
    async authenticate(username: string, password: string): Promise<User | null> {
        const sql = "SELECT password FROM users WHERE username=($1)";
        const result = await executeQuery(sql, [username]);
        if (result.length) {
            const user = result[0];
            if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}
