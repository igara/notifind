import {
  QSystemTrayIcon,
  QIcon,
  QMenu,
  QAction,
  QApplication,
  QKeySequence,
  QMainWindow,
  QMenuBar
} from "@nodegui/nodegui";
import { Renderer } from "@nodegui/react-nodegui";
import { Dock } from "@nodegui/nodegui-os-utils";
import React from "react";
import App from "@src/app";
import appIcon from "@src/app.ico";
import { distPath } from "@src/utils/paths";

process.title = "notifind";

const win = new QMainWindow();
const trayIcon = new QIcon(`${distPath}/${appIcon}`);
const tray = new QSystemTrayIcon();
tray.setIcon(trayIcon);
tray.show();
tray.setToolTip("hello");

const menu = new QMenu();
tray.setContextMenu(menu);

// -------------------
// Quit Action
// -------------------
const quitAction = new QAction();
quitAction.setText("Quit");
quitAction.setIcon(trayIcon);
quitAction.addEventListener("triggered", () => {
  const app = QApplication.instance();
  app.exit(0);
});

// -------------------
// Action with Submenu
// -------------------
const actionWithSubmenu = new QAction();
const subMenu = new QMenu();
const hideDockAction = new QAction();
hideDockAction.setText("hide");
hideDockAction.addEventListener("triggered", () => {
  Dock.hide();
});
//-----
const showDockAction = new QAction();
showDockAction.setText("show");
showDockAction.addEventListener("triggered", () => {
  Dock.show();
});
//-----
subMenu.addAction(hideDockAction);
subMenu.addAction(showDockAction);
actionWithSubmenu.setMenu(subMenu);
actionWithSubmenu.setText("Mac Dock");

// ----------------
// Dock Hide/Show
// ----------------
const hideAction = new QAction();
hideAction.setText("hide window");
hideAction.setShortcut(new QKeySequence("Alt+H"));
hideAction.addEventListener("triggered", () => {
  win.hide();
});
//-----
const showAction = new QAction();
showAction.setText("show window");
showAction.setShortcut(new QKeySequence("Alt+S"));
showAction.addEventListener("triggered", () => {
  win.show();
});

// ----------------------
// Add everything to menu
// ----------------------
menu.addAction(hideAction);
menu.addAction(showAction);
menu.addAction(actionWithSubmenu);
menu.addAction(quitAction);

const menuBar = new QMenuBar();
menuBar.addMenu(menu);
menuBar.setNativeMenuBar(true);
win.setMenuBar(menuBar);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).win = win;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).systemTray = tray;

Renderer.render(<App />);
// This is for hot reloading (this will be stripped off in production by webpack)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (module as any).hot.accept(["./app"], function() {
    Renderer.forceUpdate();
  });
}
