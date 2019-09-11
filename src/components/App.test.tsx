import { mount } from "enzyme";
import * as React from "react";
import { App } from "./App";

test("App should render correctly", () => {
    const app = mount(<App />);
    expect(app.text()).toEqual("Hello world!");
    expect(app).toMatchSnapshot();
});
