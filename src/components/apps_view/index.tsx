import {
  Text,
  View,
  LineEdit,
  ScrollArea,
  useEventHandler
} from "@nodegui/react-nodegui";
import { QLineEditSignals } from "@nodegui/nodegui";
import React from "react";
import { getApps } from "@src/scripts/get_apps";
import * as styles from "./index.style";
import { StoresContext } from "@src/stores";
import { AppList } from "./app_list";

export const AppsView = () => {
  const storesContext = React.useContext(StoresContext);

  const searchLineEditEventHandler = useEventHandler<QLineEditSignals>(
    {
      textChanged: (searchIdentifier: string) => {
        storesContext.setSearchIdentifierState(searchIdentifier);
      },
      returnPressed: () => {
        const apps = getApps(storesContext.searchIdentifierState);
        storesContext.setAppsState(apps);
      }
    },
    [storesContext.searchIdentifierState, storesContext.appsState]
  );

  return (
    <View style={styles.wrapperViewStyle}>
      <LineEdit
        placeholderText="対象のアプリケーション"
        on={searchLineEditEventHandler}
        text={storesContext.searchIdentifierState}
      />
      <Text wordWrap={true}>
        入力しないでEnterを押した時は通知を許可した全アプリケーションの表示が行われます
      </Text>

      <Text>{`<hr />`}</Text>

      <View style={styles.tableRowView}>
        <Text style={styles.tableIdentifierText}>アプリケーション</Text>
        <Text style={styles.tableNotificationCountText}>通知数</Text>
      </View>
      <Text>{`<hr />`}</Text>
      <ScrollArea style={styles.appListScrollArea}>
        <AppList />
      </ScrollArea>
    </View>
  );
};
