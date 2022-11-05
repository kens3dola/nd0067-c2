import executeQuery from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        const sql = 'select * from "public"."products"';
        return await executeQuery(sql, []);
    }
    async show(id: number): Promise<Product> {
        const sql = "select * from products where id = ($1)";
        const result = await executeQuery(sql, [id]);
        return result[0];
    }
    async create(product: Product): Promise<Product> {
        const sql = "insert into products (name, price) values($1, $2) returning *";
        const result = await executeQuery(sql, [product.name, product.price]);
        return result[0];
    }
}
