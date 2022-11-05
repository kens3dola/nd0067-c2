import request from "supertest";
import app from "../../server";

let token: string = "";
describe("user apis", () => {
    it("create user api should returns token string", async () => {
        console.log(__filename);
        const result = await request(app)
            .post("/users")
            .set("Content-Type", "application/json")
            .send({
                username: "sang",
                first_name: "sang",
                last_name: "sang",
                password: "sang",
            })
            .expect(200);
        token = result.body;
    });

    it("should return list of users", async () => {
        const result = await request(app)
            .get("/users")
            .set("Authorization", "Bearer " + token)
            .send();
        expect(result.body.length).toBe(2);
        expect(result.body[1].id).toBe(2);
    });

    it("should return a correct user", async () => {
        const result = await request(app)
            .get("/users/2")
            .set("Authorization", "Bearer " + token)
            .send();
        expect(result.body.id).toBe(2);
    });
});
const getToken = () => token;
export default getToken;
