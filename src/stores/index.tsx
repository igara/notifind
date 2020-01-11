import React from "react";
import { Apps } from "@src/scripts/get_apps";
import { Notifications } from "@src/scripts/get_notifications";

type StoresContextProps = {
  searchWordState: string;
  setSearchWordState: (searchWord: string) => void;
  appsState: Apps;
  setAppsState: (apps: Apps) => void;
  selectedAppIDState: number | null;
  setSelectedAppIDState: (appID: number | null) => void;
  notificationsState: Notifications;
  setNotificationsState: (notifications: Notifications) => void;
};

export const StoresContext = React.createContext({} as StoresContextProps);

type Props = {
  children: React.ReactNode;
};

export const Stores = (props: Props) => {
  const [searchWordState, setSearchWordState] = React.useState("");
  const [appsState, setAppsState] = React.useState<Apps>([]);
  const [selectedAppIDState, setSelectedAppIDState] = React.useState<
    number | null
  >(null);
  const [notificationsState, setNotificationsState] = React.useState<
    Notifications
  >([]);

  return (
    <StoresContext.Provider
      value={{
        searchWordState,
        setSearchWordState,
        appsState,
        setAppsState,
        selectedAppIDState,
        setSelectedAppIDState,
        notificationsState,
        setNotificationsState
      }}
    >
      {props.children}
    </StoresContext.Provider>
  );
};
