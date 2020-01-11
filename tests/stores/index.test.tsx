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
            searchWordState: storesContext.searchWordState,
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
        searchWordState: "",
        appsState: []
      })
    );
  });

  test("change searchWordState", () => {
    const searchWordState = "hoge";
    const Test = () => {
      const storesContext = React.useContext(StoresContext);
      storesContext.setSearchWordState(searchWordState);
      return <>{storesContext.searchWordState}</>;
    };

    let testWrapper!: Enzyme.ReactWrapper;
    act(() => {
      testWrapper = Enzyme.mount(
        <Stores>
          <Test />
        </Stores>
      );
    });
    expect(testWrapper.html()).toEqual(searchWordState);
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
