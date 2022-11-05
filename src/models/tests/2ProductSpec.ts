import { ProductStore } from "../products";

const productStore = new ProductStore();

describe("Product model", () => {
    it("should have an index method", () => {
        expect(productStore.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(productStore.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(productStore.create).toBeDefined();
    });

    it("create method should add a product", async () => {
        const result = await productStore.create({
            name: "test",
            price: 1,
        });
        console.log(JSON.stringify(result));
        console.log({
            id: 1,
            name: "test",
            price: 1,
        });
        expect(result).toEqual({
            id: 1,
            name: "test",
            price: 1,
        });
    });

    it("index method should return list of products", async () => {
        const result = await productStore.index();
        expect(result[0]).toEqual({
            id: 1,
            name: "test",
            price: 1,
        });
    });

    it("show method should return correct product", async () => {
        const result = await productStore.show(1);
        expect(result).toEqual({
            id: 1,
            name: "test",
            price: 1,
        });
    });
});
