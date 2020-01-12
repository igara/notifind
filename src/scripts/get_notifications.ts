import { execSync } from "child_process";
import { distPath } from "@src/utils/paths";
import "@src/scripts/notifind_db.sqlite3";
import "@src/scripts/notifind_db.py";
import "@src/scripts/get_notifications.py";
import { App } from "./get_apps";

type NotificationJSON = {
  id: number;
  date: string;
  title: string;
  sub_title: string;
  body: string;
  app: string;
};

export type Notification = {
  id: number;
  date: Date;
  dateText: string;
  title: string;
  subTitle: string;
  body: string;
  app: string;
};

export type Notifications = Notification[];

export const getNotifications = (
  searchAppID: App["id"],
  searchTitle: string,
  searchSubTitle: string,
  searchBody: string
): Notifications => {
  const jsonString = execSync(
    `(cd ${distPath} && PYTHONIOENCODING=utf-8 /usr/bin/python -c "import get_notifications; get_notifications.call('${searchAppID}', '${searchTitle}', '${searchSubTitle}', '${searchBody}')")`
  ).toString();

  return JSON.parse(jsonString).map((json: NotificationJSON) => {
    const date = new Date(json.date);

    return {
      id: json.id,
      date,
      dateText: `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(
        -2
      )}/${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(
        -2
      )}:${("0" + date.getMinutes()).slice(-2)}:${(
        "0" + date.getSeconds()
      ).slice(-2)}`,
      title: json.title,
      subTitle: json.sub_title,
      body: json.body,
      app: json.app
    };
  });
};
