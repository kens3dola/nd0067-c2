import request from "supertest";
import { STATUS } from "../../models/orders";
import app from "../../server";
import getToken from "./1UserHandlerSpec";

describe("order apis", () => {
    it("create order api should return order", async () => {
        const result = await request(app)
            .post("/orders")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + (await getToken()))
            .send({
                user_id: 2,
            })
            .expect(200);
        expect(result.body.id).toBe(2);
        expect(result.body.status).toBe(STATUS.ACTIVE);
    });

    it("should return order with status = active", async () => {
        const result = await request(app)
            .get("/orders?status=ACTIVE&user_id=2")
            .set("Authorization", "Bearer " + (await getToken()))
            .send()
            .expect(200);
        expect(result.body[0].id).toBe(2);
        expect(result.body[0].status).toBe(STATUS.ACTIVE);
    });

    it("should add product to order", async () => {
        const result = await request(app)
            .post("/orders/2/products")
            .set("Authorization", "Bearer " + (await getToken()))
            .send({
                product_id: 1,
                quantity: 2,
            })
            .expect(200);
        expect(result.body.id).toBe(2);
    });
});
