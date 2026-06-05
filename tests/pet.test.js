import axios from "axios";

const BASE_URL = "https://petstore.swagger.io/v2";

describe("Pet tests", () => {
    let petId;

    describe("POST /pet", () => {
        test("creates a new pet", async () => {
            petId = Date.now();

            const payload = {
                id: petId,
                category: {
                    id: 1,
                    name: "cats"
                },
                name: "Mirru",
                photoUrls: ["https://pixabay.com/images/download/guvo59-european-shorthair-8601492_1920.jpg"],
                tags: [
                    {
                        id: 1,
                        name: "friendly"
                    }
                ],
                status: "available"
            };

            const response = await axios.post(`${BASE_URL}/pet`, payload);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.id).toBe(petId);
            expect(response.data.name).toBe(payload.name);
            expect(response.data.status).toBe(payload.status);
        });
    });

    describe("GET /pet/{petId}", () => {
        test("gets created pet", async () => {
            const response = await axios.get(`${BASE_URL}/pet/${petId}`);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.id).toBe(petId);
            expect(response.data.name).toBe("Mirru");
        });
    });

    describe("GET /pet/{invalidId}", () => {
        test("returns 404 for not exsisting pet", async () => {
            try {
                await axios.get(`${BASE_URL}/pet/69420`);
            } catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe("PUT /pet", () => {
        test("updates a exsisting pet", async () => {
            const payload = {
                id: petId,
                category: {
                    id: 1,
                    name: "cats"
                },
                name: "MrKitty",
                photoUrls: ["https://media.istockphoto.com/id/936176546/photo/angry-cat.jpg"],
                tags: [
                    {
                        id: 1,
                        name: "agressive"
                    }
                ],
                status: "sold"
            };

            const response = await axios.put(`${BASE_URL}/pet`, payload);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.id).toBe(petId);
            expect(response.data.name).toBe(payload.name);
            expect(response.data.status).toBe(payload.status);
        });
    });

    describe("DELETE /pet/{petId}", () => {
        test("deletes the pet", async () => {
            const response = await axios.delete(`${BASE_URL}/pet/${petId}`);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
        });
    });

    describe("GET deleted pet", () => {
        test("returns 404 after deletion", async () => {
            try {
                await axios.get(`${BASE_URL}/pet/${petId}`);
            } catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe("DELETE /pet/{invalidId}", () => {
        test("error handling for invalid request", async () => {
            try {
                await axios.delete(`${BASE_URL}/pet/invalid-id`);
            } catch (error) {
                expect([400, 404]).toContain(error.response.status);
            }
        });
    });
});