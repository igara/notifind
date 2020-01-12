import { execSync } from "child_process";
import { distPath } from "@src/utils/paths";
import "@src/scripts/notifind_db.sqlite3";
import "@src/scripts/notifind_db.py";
import "@src/scripts/notification_center_db.py";
import "@src/scripts/sync.py";

export const sync = () => {
  execSync(
    `(cd ${distPath} && PYTHONIOENCODING=utf-8 /usr/bin/python -c "import sync; sync.call()")`
  );
};
