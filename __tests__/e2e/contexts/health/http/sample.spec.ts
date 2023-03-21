describe("Sample Test Endpooint", () => {
  it("should return 200 as status code", async () => {
    const { body, statusCode } = await (global as any).request.get("/sample");

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        hello: expect.any(String),
      })
    );
  });
});
