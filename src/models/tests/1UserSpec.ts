import { UserStore } from "../users";

const userStore = new UserStore();

describe("User model", () => {
    it("should have an index method", () => {
        expect(userStore.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(userStore.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(userStore.create).toBeDefined();
    });

    it("create method should add a user", async () => {
        const result = await userStore.create({
            username: "test",
            first_name: "fn",
            last_name: "ln",
            password: "password",
        });
        expect(result.id).toEqual(1);
        expect(result.username).toEqual("test");
    });

    it("index method should return list of users", async () => {
        const result = await userStore.index();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(1);
    });

    it("show method should return correct user", async () => {
        const result = await userStore.show(1);
        expect(result.id).toEqual(1);
        expect(result.username).toEqual("test");
    });
});
