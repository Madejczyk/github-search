import { mount } from "enzyme";
import * as React from "react";
import { GithubSearch } from "./GithubSearch";
require("isomorphic-fetch");

describe("GithubSearch", () => {
    test("should initial contains disabled search button", () => {
        // given
        const component = mount(<GithubSearch />);
        expect(component.state()).toEqual({
            errorMessage: "",
            loadingState: "NOT_LOADED",
            userName: "",
        });
        // when and then
        expect(component.find(".submit-button").prop("disabled")).toBe(true);
        expect(component.render()).toMatchSnapshot();
    });

    test("should has enable search button when username is changed", () => {
        // given
        const component = mount(<GithubSearch />);
        component.find(".search-input").simulate("focus");
        // when
        component.find(".search-input").simulate("change", {
            target: {
                value: "madejczyk",
            },
        });
        // then
        expect(component.state()).toEqual({
            errorMessage: "",
            loadingState: "NOT_LOADED",
            userName: "madejczyk",
        });
        expect(component.find(".submit-button").prop("disabled")).toBe(false);
        expect(component.render()).toMatchSnapshot();
    });

    test("should set loading status after submit", () => {
        // given
        const component = mount(<GithubSearch />);
        component.find(".search-input").simulate("focus");
        component.find(".search-input").simulate("change", {
            target: {
                value: "madejczyk",
            },
        });
        // when
        component.find("form").simulate("submit");
        // then
        expect(component.state()).toEqual({
            errorMessage: "",
            loadingState: "LOADING",
            userName: "madejczyk",
        });
        expect(component.render()).toMatchSnapshot();
    });

    test("should set error when api returns error", (done) => {
        // given
        const component = mount(<GithubSearch />);
        component.find(".search-input").simulate("focus");
        // when
        component.find(".search-input").simulate("change", {
            target: {
                value: "madejczy",
            },
        });
        component.find("form").simulate("submit");
        // then
        setTimeout(() => {
            expect(component.state()).toEqual({
                errorMessage: "Not Found",
                loadingState: "ERROR",
                userName: "madejczy",
            });
            expect(component.render()).toMatchSnapshot();
            done();
        }, 3000);
    });

    test("should set loaded status when username is correct", (done) => {
        // given
        const component = mount(<GithubSearch />);
        component.find(".search-input").simulate("focus");
        // when
        component.find(".search-input").simulate("change", {
            target: {
                value: "madejczyk",
            },
        });
        component.find("form").simulate("submit");
        // then
        setTimeout(() => {
            expect(component.state()).toEqual({
                errorMessage: "",
                loadingState: "LOADED",
                userInfo: {
                    avatar_url: "https://avatars2.githubusercontent.com/u/11577626?v=4",
                    bio: null,
                    name: "Jakub Madejczyk",
                    repos_url: "https://api.github.com/users/Madejczyk/repos",
                },
                userName: "madejczyk",
            });
            expect(component.render()).toMatchSnapshot();
            done();
        }, 3000);
    });
});
