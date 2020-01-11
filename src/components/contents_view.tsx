import { View } from "@nodegui/react-nodegui";
import React from "react";
import * as styles from "./contents_view.style";
import { StoresContext } from "@src/stores";
import { AppsView } from "@src/components/apps_view";
import { NotificationsView } from "@src/components/notifications_view";
import { sync } from "@src/scripts/sync";
import { getApps } from "@src/scripts/get_apps";

export const ContentsView = () => {
  const storesContext = React.useContext(StoresContext);

  React.useEffect(() => {
    setTimeout(() => {
      sync();
      const apps = getApps(storesContext.searchWordState);
      storesContext.setAppsState(apps);
    }, 10000);
  }, [storesContext.appsState]);

  return (
    <View style={styles.wrapperView}>
      <AppsView />
      <NotificationsView />
    </View>
  );
};
