import { Text, View, PlainTextEdit } from "@nodegui/react-nodegui";
import React from "react";
import { Notification } from "@src/scripts/get_notifications";
import * as styles from "./notification_list.style";
import { StoresContext } from "@src/stores";

export const NotificationList = () => {
  const storesContext = React.useContext(StoresContext);

  const notificationListElement = storesContext.notificationsState.map(
    (notification: Notification) => {
      const height = 30 + Math.floor(notification.body.length / 20) * 30;

      return (
        <View
          key={notification.id}
          style={`height: ${height}px;${styles.tableRowView}`}
        >
          <Text
            size={{
              width: 150,
              height: height
            }}
            wordWrap={true}
            style={styles.tableTitleText}
          >
            {notification.title}
          </Text>
          <Text
            size={{
              width: 150,
              height: height
            }}
            wordWrap={true}
            style={styles.tableSubTitleText}
          >
            {notification.subTitle}
          </Text>
          <PlainTextEdit
            size={{
              width: 250,
              height: height
            }}
            readOnly={true}
            text={notification.body}
            style={styles.tableBodyText}
          />
          <Text
            size={{
              width: 150,
              height: height
            }}
            wordWrap={true}
            style={styles.tableDateText}
          >
            {notification.dateText}
          </Text>
        </View>
      );
    }
  );

  return <View style={styles.wrapperViewStyle}>{notificationListElement}</View>;
};
