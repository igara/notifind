import { execSync } from "child_process";
import { distPath } from "@src/utils/paths";
import "@src/scripts/notifind_db.sqlite3";
import "@src/scripts/notifind_db.py";
import "@src/scripts/get_apps.py";

type AppJSON = {
  id: number;
  identifier: string;
  notification_count: number;
};

export type App = {
  id: number;
  identifier: string;
  notificationCount: number;
};

export type Apps = App[];

export const getApps = (searchWord: string): Apps => {
  const jsonString = execSync(
    `(cd ${distPath} && PYTHONIOENCODING=utf-8 /usr/bin/python -c "import get_apps; get_apps.call('${searchWord}')")`
  ).toString();

  return JSON.parse(jsonString).map((json: AppJSON) => ({
    id: json.id,
    identifier: json.identifier,
    notificationCount: json.notification_count
  }));
};
