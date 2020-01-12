import {
  Text,
  View,
  ScrollArea,
  LineEdit,
  useEventHandler
} from "@nodegui/react-nodegui";
import { QLineEditSignals } from "@nodegui/nodegui";
import React from "react";
import { App } from "@src/scripts/get_apps";
import * as styles from "./index.style";
import { StoresContext } from "@src/stores";
import { NotificationList } from "./notification_list";
import { getNotifications } from "@src/scripts/get_notifications";

export const NotificationsView = () => {
  const storesContext = React.useContext(StoresContext);

  const selectedApp = storesContext.appsState.find(
    (app: App) => app.id === storesContext.selectedAppIDState
  );

  if (!selectedApp) return <View />;

  const searchTitleLineEditEventHandler = useEventHandler<QLineEditSignals>(
    {
      textChanged: (searchTitle: string) => {
        storesContext.setSearchTitleState(searchTitle);
      },
      returnPressed: () => {
        const notifications = getNotifications(
          storesContext.selectedAppIDState,
          storesContext.searchTitleState,
          storesContext.searchSubTitleState,
          storesContext.searchBodyState
        );
        storesContext.setNotificationsState(notifications);
      }
    },
    [storesContext.searchTitleState, storesContext.notificationsState]
  );

  const searchSubTitleLineEditEventHandler = useEventHandler<QLineEditSignals>(
    {
      textChanged: (searchSubTitle: string) => {
        storesContext.setSearchSubTitleState(searchSubTitle);
      },
      returnPressed: () => {
        const notifications = getNotifications(
          storesContext.selectedAppIDState,
          storesContext.searchTitleState,
          storesContext.searchSubTitleState,
          storesContext.searchBodyState
        );
        storesContext.setNotificationsState(notifications);
      }
    },
    [storesContext.searchSubTitleState, storesContext.notificationsState]
  );

  const searchBodyLineEditEventHandler = useEventHandler<QLineEditSignals>(
    {
      textChanged: (searchBody: string) => {
        storesContext.setSearchBodyState(searchBody);
      },
      returnPressed: () => {
        const notifications = getNotifications(
          storesContext.selectedAppIDState,
          storesContext.searchTitleState,
          storesContext.searchSubTitleState,
          storesContext.searchBodyState
        );
        storesContext.setNotificationsState(notifications);
      }
    },
    [storesContext.searchBodyState, storesContext.notificationsState]
  );

  return (
    <View style={styles.wrapperView}>
      <Text wordWrap={true}>{selectedApp.identifier}</Text>

      <Text>
        {`
        <br />
        <br />
        <hr />
        `}
      </Text>
      <View style={styles.tableRowView}>
        <View style={styles.tableTitleView}>
          <Text>タイトル</Text>
          <LineEdit
            placeholderText="対象のタイトル"
            on={searchTitleLineEditEventHandler}
          />
        </View>
        <View style={styles.tableSubTitleView}>
          <Text>サブタイトル</Text>
          <LineEdit
            placeholderText="対象のサブタイトル"
            on={searchSubTitleLineEditEventHandler}
          />
        </View>
        <View style={styles.tableBodyView}>
          <Text>本文</Text>
          <LineEdit
            placeholderText="対象の本文"
            on={searchBodyLineEditEventHandler}
          />
        </View>
        <View style={styles.tableDateView}>
          <Text>日付</Text>
        </View>
      </View>
      <Text>{`<hr />`}</Text>
      <ScrollArea style={styles.notificationListScrollArea}>
        <NotificationList />
      </ScrollArea>
    </View>
  );
};
