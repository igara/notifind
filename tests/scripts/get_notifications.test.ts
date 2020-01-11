describe("getNotifications", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("return value", () => {
    const test = {
      id: 1,
      date: "2019-12-14 16:35:58 +0000",
      title:
        "/Users/igarashishou/workspace/syonet/syonet_seven/nodejs/www - 24% Failed",
      body: "\u26d4\ufe0f 5 of 21 tests failed",
      app: "nl.superalloy.oss.terminal-notifier"
    };
    jest.doMock("child_process", () => ({
      execSync: jest.fn(() => JSON.stringify([test]))
    }));

    const { getNotifications } = require("@src/scripts/get_notifications");
    const notications = getNotifications();

    const testDate = new Date(test.date);
    const testDateText = `${testDate.getFullYear()}/${(
      "0" +
      (testDate.getMonth() + 1)
    ).slice(-2)}/${("0" + testDate.getDate()).slice(-2)} ${(
      "0" + testDate.getHours()
    ).slice(-2)}:${("0" + testDate.getMinutes()).slice(-2)}:${(
      "0" + testDate.getSeconds()
    ).slice(-2)}`;
    expect(notications).toEqual([
      {
        id: test.id,
        date: testDate,
        dateText: testDateText,
        title: test.title,
        body: test.body,
        app: test.app
      }
    ]);
  });
});
