import { Application, Request, Response } from "express";
import { Product, ProductStore } from "../models/products";
import verifyAuthToken from "../middlewares/authenticator";

const productStore = new ProductStore();

const productRoutes = (app: Application): void => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", verifyAuthToken, create);
};
const index = async (_req: Request, res: Response): Promise<void> => {
    const products = await productStore.index();
    res.json(products);
};

const show = async (req: Request, res: Response): Promise<void> => {
    const product = await productStore.show(+(req.params.id as string));
    res.json(product);
};

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await productStore.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default productRoutes;
