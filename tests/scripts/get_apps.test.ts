describe("getApps", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("return value", () => {
    const test = {
      id: 1,
      identifier: "hoge",
      notification_count: 1
    };
    jest.doMock("child_process", () => ({
      execSync: jest.fn(() => JSON.stringify([test]))
    }));

    const { getApps } = require("@src/scripts/get_apps");
    const apps = getApps();
    expect(apps).toEqual([
      {
        id: test.id,
        identifier: test.identifier,
        notificationCount: test.notification_count
      }
    ]);
  });
});
