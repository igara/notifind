import React from "react";
import Enzyme from "enzyme";
import { act } from "@testing-library/react-hooks";
import { Stores, StoresContext } from "@src/stores";

describe("Stores", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("initializeState", () => {
    const Test = () => {
      const storesContext = React.useContext(StoresContext);

      return (
        <>
          {JSON.stringify({
            searchIdentifierState: storesContext.searchIdentifierState,
            appsState: storesContext.appsState
          })}
        </>
      );
    };

    let testWrapper!: Enzyme.ReactWrapper;
    act(() => {
      testWrapper = Enzyme.mount(
        <Stores>
          <Test />
        </Stores>
      );
    });
    expect(testWrapper.html()).toEqual(
      JSON.stringify({
        searchIdentifierState: "",
        appsState: []
      })
    );
  });

  test("change searchIdentifierState", () => {
    const searchIdentifierState = "hoge";
    const Test = () => {
      const storesContext = React.useContext(StoresContext);
      storesContext.setSearchIdentifierState(searchIdentifierState);
      return <>{storesContext.searchIdentifierState}</>;
    };

    let testWrapper!: Enzyme.ReactWrapper;
    act(() => {
      testWrapper = Enzyme.mount(
        <Stores>
          <Test />
        </Stores>
      );
    });
    expect(testWrapper.html()).toEqual(searchIdentifierState);
  });

  test("change appsState", () => {
    const appsState = [{ id: 1, identifier: "hoge", notificationCount: 0 }];
    const Test = () => {
      const storesContext = React.useContext(StoresContext);
      storesContext.setAppsState(appsState);
      return <>{JSON.stringify(storesContext.appsState)}</>;
    };

    let testWrapper!: Enzyme.ReactWrapper;
    act(() => {
      testWrapper = Enzyme.mount(
        <Stores>
          <Test />
        </Stores>
      );
    });
    expect(testWrapper.html()).toEqual(JSON.stringify(appsState));
  });
});
