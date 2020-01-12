import { Text, View, PlainTextEdit } from "@nodegui/react-nodegui";
import React from "react";
import { Notification } from "@src/scripts/get_notifications";
import * as styles from "./notification_view.style";

type Props = {
  notification: Notification;
};

export const NotificationView = (props: Props) => {
  const height = 30 + Math.floor(props.notification.body.length / 20) * 30;

  return (
    <View
      key={props.notification.id}
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
        {props.notification.title}
      </Text>
      <Text
        size={{
          width: 150,
          height: height
        }}
        wordWrap={true}
        style={styles.tableSubTitleText}
      >
        {props.notification.subTitle}
      </Text>
      <PlainTextEdit
        size={{
          width: 250,
          height: height
        }}
        readOnly={true}
        text={props.notification.body}
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
        {props.notification.dateText}
      </Text>
    </View>
  );
};
