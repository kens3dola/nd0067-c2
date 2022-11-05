import { Application, Request, Response } from "express";
import { OrderStore, STATUS } from "../models/orders";
import { DashboardQueries } from "../services/dashboard";
import verifyAuthToken from "../middlewares/authenticator";

const orderStore = new OrderStore();
const dashboard = new DashboardQueries();

const orderRoutes = (app: Application) => {
    app.get("/orders", verifyAuthToken, getOrderByStatus);
    app.post("/orders", verifyAuthToken, create);
    app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

const getOrderByStatus = async (req: Request, res: Response) => {
    const status = req.query.status as string as STATUS;
    const user_id = +(req.query.user_id as string);
    if (!status || !user_id) {
        res.status(400);
        res.send("Invalid parameters");
        return;
    }
    const orders = await orderStore.getOrderByStatus(status, user_id);
    for (let order of orders) {
        const prods = await dashboard.productsInOrder(order.id);
        order.products = [...prods];
    }
    res.send(orders);
};

const addProduct = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const productId = +req.body.product_id;
    const quantity: number = +req.body.quantity;
    if (!id || !productId || !quantity) {
        res.status(400).send("invalid order id or product id or quantity");
        return;
    }
    const addedProduct = await orderStore.addProduct(quantity, id, productId);
    res.send(addedProduct);
};

const create = async (req: Request, res: Response) => {
    const user_id = +req.body.user_id;
    if (!user_id) {
        res.status(400).send("Invalid user id");
    }
    const order = await orderStore.getOrderByStatus(STATUS.ACTIVE, user_id);
    if (order[0]) {
        res.send(order[0]);
        return;
    }
    const result = await orderStore.create(user_id);
    res.send(result);
};

export default orderRoutes;
