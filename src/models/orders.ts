import executeQuery from "../database";
import { Product } from "./products";

export type Order = {
    id: number;
    status: string;
    user_id: number;
    products?: Product[];
};

export enum STATUS {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
}

export class OrderStore {
    async create(user_id: number): Promise<Order> {
        const sql = "insert into orders(user_id, status) values($1, 'ACTIVE') returning *";
        const result = await executeQuery(sql, [user_id]);
        return result[0];
    }
    async getOrderByStatus(status: STATUS, user_id: number): Promise<Order[]> {
        const sql = "select * from orders where status = ($1) and user_id = ($2)";
        return executeQuery(sql, [status, user_id]);
    }

    async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
        const ordersql = "SELECT * FROM orders WHERE id=($1)";
        const order: Order[] = await executeQuery(ordersql, [orderId]);
        if (order[0].status !== "ACTIVE") {
            throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order[0].status}`);
        }
        const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
        const result = await executeQuery(sql, [quantity, orderId, productId]);
        return result[0];
    }
}
