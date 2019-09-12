import * as React from "react";
import { SearchInput } from "./SearchInput";
import { SubmitButton } from "./SubmitButton";
import { Title } from "./Title";

enum LoadingState {
    NOT_LOADED = "NOT_LOADED",
    LOADING = "LOADING",
    LOADED = "LOADED",
    ERROR = "ERROR",
}

type GithubSearchState = {
    loadingState: LoadingState
    userName: string,
};

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export class GithubSearch extends React.PureComponent<{}, GithubSearchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loadingState: LoadingState.NOT_LOADED,
            userName: "",
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({userName: event.target.value});
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.setState({loadingState: LoadingState.LOADING});
        event.preventDefault();
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit} className="github-search">
                <Title/>
                <SearchInput
                    onChange={this.onChange}
                    value={this.state.userName}
                />
                <SubmitButton
                    isDisabled={!USERNAME_REGEX.test(this.state.userName)}
                />
            </form>
        );
    }
}
