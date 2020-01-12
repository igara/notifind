import { View } from "@nodegui/react-nodegui";
import React from "react";
import { Notification } from "@src/scripts/get_notifications";
import * as styles from "./notification_list.style";
import { StoresContext } from "@src/stores";
import { NotificationView } from "./notification_view";

export const NotificationList = () => {
  const storesContext = React.useContext(StoresContext);

  const notificationListElement = storesContext.notificationsState.map(
    (notification: Notification) => {
      return (
        <NotificationView key={notification.id} notification={notification} />
      );
    }
  );

  return <View style={styles.wrapperView}>{notificationListElement}</View>;
};
