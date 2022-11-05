import request from "supertest";
import app from "../../server";
import getToken from "../2-handlers/1UserHandlerSpec";

describe("product apis", () => {
    it("create product api should return product", async () => {
        console.log(__filename);
        const result = await request(app)
            .post("/products")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + (await getToken()))
            .send({
                name: "product",
                price: 1,
            })
            .expect(200);
        expect(result.body.name).toBe("product");
        expect(result.body.price).toBe(1);
    });

    it("should return list of products", async () => {
        const result = await request(app)
            .get("/products")
            .set("Authorization", "Bearer " + (await getToken()))
            .send();
        expect(result.body.length).toBe(2);
        expect(result.body[1].id).toBe(2);
    });

    it("should return a correct product", async () => {
        const result = await request(app)
            .get("/products/2")
            .set("Authorization", "Bearer " + (await getToken()))
            .send();
        expect(result.body.id).toBe(2);
    });
});
