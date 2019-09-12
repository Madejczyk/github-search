import { mount } from "enzyme";
import * as React from "react";
import { GithubSearch } from "./GithubSearch";

describe("GithubSearch", () => {
    test("should initial contains disabled search button", () => {
        const component = mount(<GithubSearch />);
        expect(component.state()).toEqual({
            loadingState: "NOT_LOADED",
            userName: "",
        });
        expect(component.find(".submit-button").prop("disabled")).toBe(true);
        expect(component.render()).toMatchSnapshot();
    });

    test("should has enable search button when username is changed", () => {
        const component = mount(<GithubSearch />);
        component.find(".search-input").simulate("focus");
        component.find(".search-input").simulate("change", {
            target: {
                value: "test",
            },
        });
        expect(component.state()).toEqual({
            loadingState: "NOT_LOADED",
            userName: "test",
        });
        expect(component.find(".submit-button").prop("disabled")).toBe(false);
        expect(component.render()).toMatchSnapshot();
    });
});
