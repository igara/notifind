describe("distPath", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("return value", () => {
    const test = "/hoge/dist";
    jest.doMock("path", () => ({
      resolve: jest.fn(() => "/hoge/dist")
    }));

    const { distPath } = require("@src/utils/paths");
    expect(distPath).toEqual(test);
  });
});
