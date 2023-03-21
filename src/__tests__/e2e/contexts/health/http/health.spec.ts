describe("Health Test endpoint", () => {
  it("should return 200 as status code", async () => {
    const { statusCode } = await (global as any).request.get("/health");

    expect(statusCode).toBe(200);
  });
});
