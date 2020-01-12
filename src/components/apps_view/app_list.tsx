import { View } from "@nodegui/react-nodegui";
import React from "react";
import { App } from "@src/scripts/get_apps";
import * as styles from "./app_list.style";
import { StoresContext } from "@src/stores";
import { AppView } from "./app_view";

export const AppList = () => {
  const storesContext = React.useContext(StoresContext);

  const appListElement = storesContext.appsState.map((app: App) => {
    return <AppView key={app.id} app={app} />;
  });

  return <View style={styles.wrapperView}>{appListElement}</View>;
};
