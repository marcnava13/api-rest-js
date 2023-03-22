describe("Users Test", () => {
  let uuid = "b6d62238-461f-4827-8844-b0454140a9e9";
  let timeSpent = 0;

  it("should return 201 as status code when we create a new user", async () => {
    const { body, statusCode } = await (global as any).request
      .post("/users")
      .send({
        id: uuid,
        email: "test@test.com",
      });

    expect(statusCode).toBe(201);
    expect(body).toEqual(expect.objectContaining({}));
  });

  it("should return one user by id", async () => {
    const begin = Date.now();

    const { body, statusCode } = await (global as any).request.get(
      `/users/${uuid}`
    );
    const end = Date.now();
    timeSpent = end - begin;

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(body.id).toBe(uuid);
  });

  it("should return one user by id from cache", async () => {
    const begin = Date.now();
    await (global as any).request.get(`/users/${uuid}`);
    const end = Date.now();

    expect(end - begin).toBeLessThanOrEqual(timeSpent);
  });
});
