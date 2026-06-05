import axios from "axios";

const BASE_URL = "https://petstore.swagger.io/v2";

describe("Store tests", () => {
    let orderId;

    describe("GET /store/inventory", () => {
        test("returns inventory counts", async () => {
            const response = await axios.get(`${BASE_URL}/store/inventory`);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
        });
    });

    describe("POST /store/order", () => {
        test("creates a new order", async () => {
            orderId = Date.now();

            const payload = {
                id: orderId,
                petId: 12345,
                quantity: 2,
                shipDate: new Date().toISOString(),
                status: "placed",
                complete: false
            };

            const response = await axios.post(`${BASE_URL}/store/order`, payload);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.id).toBe(orderId);
            expect(response.data.petId).toBe(payload.petId);
            expect(response.data.quantity).toBe(payload.quantity);
            expect(response.data.status).toBe(payload.status);
        });
    });

    describe("GET /store/order{orderId}", () => {
        test("retrieves created order", async () => {
            const response = await axios.get(`${BASE_URL}/store/order/${orderId}`);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.id).toBe(orderId);
        });
    });

    describe("GET /store/order/{invalidId}", () => {
        test("returns 404 for not exsisting order", async () => {
            try {
                await axios.get(`${BASE_URL}/store/order/69420`);
            } catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe("DELETE /store/order/{orderId}", () => {
        test("deletes the order", async () => {
            const response = await axios.delete(`${BASE_URL}/store/order/${orderId}`);

            expect(response.status).toBe(200);
        });
    });

    describe("GET deleted order", () => {
        test("returns 404", async () => {
            try {
                await axios.get(`${BASE_URL}/store/order/${orderId}`);
            } catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe("DELETE /store/order/{invalidId}", () => {
        test("error handling for invalid request", async () => {
            try {
                await axios.delete(`${BASE_URL}/store/order/invalid-id`);
            } catch (error) {
                expect([400, 404]).toContain(error.response.status);
            }
        });
    });
});