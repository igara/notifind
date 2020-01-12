import React from "react";
import { Apps } from "@src/scripts/get_apps";
import { Notifications } from "@src/scripts/get_notifications";

type StoresContextProps = {
  searchIdentifierState: string;
  setSearchIdentifierState: (searchIdentifier: string) => void;
  appsState: Apps;
  setAppsState: (apps: Apps) => void;
  selectedAppIDState: number;
  setSelectedAppIDState: (appID: number) => void;
  notificationsState: Notifications;
  setNotificationsState: (notifications: Notifications) => void;
  searchTitleState: string;
  setSearchTitleState: (searchTitle: string) => void;
  searchSubTitleState: string;
  setSearchSubTitleState: (searchSubTitle: string) => void;
  searchBodyState: string;
  setSearchBodyState: (searchBody: string) => void;
};

export const StoresContext = React.createContext({} as StoresContextProps);

type Props = {
  children: React.ReactNode;
};

export const Stores = (props: Props) => {
  const [searchIdentifierState, setSearchIdentifierState] = React.useState("");
  const [appsState, setAppsState] = React.useState<Apps>([]);
  const [selectedAppIDState, setSelectedAppIDState] = React.useState<number>(0);
  const [notificationsState, setNotificationsState] = React.useState<
    Notifications
  >([]);
  const [searchTitleState, setSearchTitleState] = React.useState("");
  const [searchSubTitleState, setSearchSubTitleState] = React.useState("");
  const [searchBodyState, setSearchBodyState] = React.useState("");

  return (
    <StoresContext.Provider
      value={{
        searchIdentifierState,
        setSearchIdentifierState,
        appsState,
        setAppsState,
        selectedAppIDState,
        setSelectedAppIDState,
        notificationsState,
        setNotificationsState,
        searchTitleState,
        setSearchTitleState,
        searchSubTitleState,
        setSearchSubTitleState,
        searchBodyState,
        setSearchBodyState
      }}
    >
      {props.children}
    </StoresContext.Provider>
  );
};
