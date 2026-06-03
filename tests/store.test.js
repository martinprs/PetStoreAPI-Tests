import axios from "axios";

const BASE_URL = "https://petstore.swagger.io/v2";

describe("Store tests", () => {
    describe("GET /store/inventory", () => {
        test("returns inventory counts", async () => {
            const response = await axios.get(`${BASE_URL}/store/inventory`);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
        });
    });
});