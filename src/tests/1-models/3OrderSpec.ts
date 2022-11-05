import { OrderStore, STATUS } from "../../models/orders";

const orderStore = new OrderStore();

describe("Order model", () => {
    it("should have an create method", () => {
        console.log(__filename);
        expect(orderStore.create).toBeDefined();
    });
    it("should have a addProduct method", () => {
        expect(orderStore.addProduct).toBeDefined();
    });

    it("should have a getOrderByStatus method", () => {
        expect(orderStore.getOrderByStatus).toBeDefined();
    });

    it("create method should add a order", async () => {
        const result = await orderStore.create(1);
        expect(result.id).toEqual(1);
        expect(result.status).toEqual(STATUS.ACTIVE);
    });

    it("addProduct method should add order_products", async () => {
        const result = await orderStore.addProduct(1, 1, 1);
        expect(result.id).toEqual(1);
    });

    it("getOrderByStatus method should return correct order", async () => {
        const result = await orderStore.getOrderByStatus(STATUS.ACTIVE, 1);
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(1);
    });
});
