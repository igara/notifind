import {
  View,
  PlainTextEdit,
  Button,
  useEventHandler
} from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";
import React from "react";
import { App } from "@src/scripts/get_apps";
import { getNotifications } from "@src/scripts/get_notifications";
import * as styles from "./app_view.style";
import { StoresContext } from "@src/stores";

type Props = {
  app: App;
};

export const AppView = (props: Props) => {
  const storesContext = React.useContext(StoresContext);

  const notificationButtonEventHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        storesContext.setSelectedAppIDState(props.app.id);
        const notifications = getNotifications(props.app.id);
        storesContext.setNotificationsState(notifications);
      }
    },
    [storesContext.selectedAppIDState, storesContext.notificationsState]
  );

  const height = 30 + Math.floor(props.app.identifier.length / 20) * 30;

  return (
    <View style={`height: ${height}px;${styles.tableRowView}`}>
      <PlainTextEdit
        size={{
          width: 216,
          height: height
        }}
        readOnly={true}
        text={props.app.identifier}
        style={styles.tableIdentifierText}
      />
      <Button
        style={styles.tableNotificationCountText}
        on={notificationButtonEventHandler}
        text={props.app.notificationCount.toString()}
      />
    </View>
  );
};
