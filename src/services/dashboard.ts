import executeQuery from "../database";
import { Product } from "../models/products";

export class DashboardQueries {
    // Get all products that have been included in orders
    async productsInOrder(order_id: number): Promise<Product[]> {
        const sql =
            "SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.id where order_id = ($1)";
        return executeQuery(sql, [order_id]);
    }
}
