import { mount } from "enzyme";
import * as React from "react";
import { App } from "./App";
import { GithubSearch } from "./github-search/GithubSearch";

test("App should contains GitHub search", () => {
    const app = mount(<App />);
    expect(app.find(GithubSearch)).toHaveLength(1);
    expect(app.render()).toMatchSnapshot();
});
