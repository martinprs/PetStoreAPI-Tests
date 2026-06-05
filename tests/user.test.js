import axios from "axios";

const BASE_URL = "https://petstore.swagger.io/v2";

describe("User tests", () => {
    let username;

    describe("POST /user", () => {
        test("creates a new user", async () => {
            username = `user_${Date.now()}`;

            const payload = {
                id: Date.now(),
                username: username,
                firstName: "Martin",
                lastName: "Pruus",
                email: "martin.pruus@tptlive.ee",
                password: "Passw0rd",
                phone: "123456789",
                userStatus: 1
            };

            const response = await axios.post(`${BASE_URL}/user`, payload);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.message).toBeDefined();
        });
    });

    describe("GET /user/{username}", () => {
        test("gets created user", async () => {
            const response = await axios.get(`${BASE_URL}/user/${username}`);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.username).toBe(username);
        });
    });


    describe("GET /user/{invalidUsername}", () => {
        test("returns 404 for not exsisting user", async () => {
            try {
                await axios.get(`${BASE_URL}/user/jwjdaowjdoajiwdjaid`);
            } catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe("PUT /user/{username}", () => {
        test("updates existing user", async () => {
            const payload = {
                id: Date.now(),
                username: username,
                firstName: "Martin",
                lastName: "Pruus",
                email: "martin.pruus@techno.ee",
                password: "Skibidi",
                phone: "123456789",
                userStatus: 1
            };

            const response = await axios.put(`${BASE_URL}/user/${username}`, payload);

            expect(response.status).toBe(200);
            expect(response.data).toEqual(expect.any(Object));
            expect(response.data.message).toBeDefined();
        });
    });

    describe("DELETE /user/{username}", () => {
        test("deletes the user", async () => {
            const response = await axios.delete(`${BASE_URL}/user/${username}`);

            expect(response.status).toBe(200);
        });
    });

    describe("GET deleted user", () => {
        test("returns 404", async () => {
            try {
                await axios.get(`${BASE_URL}/user/${username}`);
            } catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    describe("DELETE /user/{invalid}", () => {
        test("error handling for invalid request", async () => {
            try {
                await axios.delete(`${BASE_URL}/user/toiler`);
            } catch (error) {
                expect([400, 404]).toContain(error.response.status);
            }
        });
    });
});