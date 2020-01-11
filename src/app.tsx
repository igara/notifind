import { Text, Window, hot, View } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import appIcon from "@src/app.ico";
import { distPath } from "@src/utils/paths";
import * as styles from "@src/app.style";
import { Stores } from "@src/stores";
import { ContentsView } from "@src/components/contents_view";

const minSize = { width: 1100, height: 600 };
const winIcon = new QIcon(`${distPath}/${appIcon}`);

const App = () => {
  return (
    <Stores>
      <Window windowIcon={winIcon} windowTitle="notifind" minSize={minSize}>
        <View style={styles.wrapperView}>
          <Text style={styles.titleText}>notifind</Text>
          <Text style={styles.contextText}>
            過去の通知を振り返りやすくするアプリです
          </Text>

          <ContentsView />
        </View>
      </Window>
    </Stores>
  );
};

export default hot(App);
