describe("Health Test endpoint", () => {
  it("should return 200 as status code", async () => {
    const { body, statusCode } = await (global as any).request.get("/health");

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        redis: expect.any(Boolean),
      })
    );
    expect(body.redis).toBeTruthy();
  });
});
