import { Text, View, ScrollArea } from "@nodegui/react-nodegui";
import React from "react";
import { App } from "@src/scripts/get_apps";
import * as styles from "./index.style";
import { StoresContext } from "@src/stores";
import { NotificationList } from "./notification_list";

export const NotificationsView = () => {
  const storesContext = React.useContext(StoresContext);

  const selectedApp = storesContext.appsState.find(
    (app: App) => app.id === storesContext.selectedAppIDState
  );

  return selectedApp ? (
    <View style={styles.wrapperViewStyle}>
      <Text wordWrap={true}>{selectedApp.identifier}</Text>

      <Text>
        {`
        <br />
        <br />
        <hr />
        `}
      </Text>
      <View style={styles.tableRowView}>
        <Text style={styles.tableTitleText}>タイトル</Text>
        <Text style={styles.tableSubTitleText}>サブタイトル</Text>
        <Text style={styles.tableBodyText}>本文</Text>
        <Text style={styles.tableDateText}>日付</Text>
      </View>
      <Text>{`<hr />`}</Text>
      <ScrollArea style={styles.notificationListScrollArea}>
        <NotificationList />
      </ScrollArea>
    </View>
  ) : null;
};
