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

enum SubmitButtonValue {
    NOT_LOADED = "Search",
    LOADING = "Loading ...",
    LOADED = "Sucess :)",
    ERROR = "Error :(",
}

type GithubSearchState = {
    errorMessage: string,
    loadingState: LoadingState
    userName: string,
};

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export class GithubSearch extends React.PureComponent<{}, GithubSearchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            errorMessage: "",
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
        this.findUserDetails();
    }

    private async findUserDetails() {
        const url = `https://api.github.com/users/${this.state.userName}`;
        const response = await fetch(url);
        if (!response.ok) {
            this.setState({
                errorMessage: response.statusText,
                loadingState: LoadingState.ERROR,
            });
        } else {
            const result = await response.json();
            this.setState({loadingState: LoadingState.LOADED});
        }
    }

    private isSubmitButtonDisabled = () => {
        return !USERNAME_REGEX.test(this.state.userName) || this.state.loadingState === LoadingState.LOADING;
    }

    private getSubmitButtonMessage = () => {
        return this.state.loadingState === LoadingState.ERROR ?
            this.state.errorMessage : SubmitButtonValue[this.state.loadingState];
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
                    isDisabled={this.isSubmitButtonDisabled()}
                    text={this.getSubmitButtonMessage()}
                />
            </form>
        );
    }
}
