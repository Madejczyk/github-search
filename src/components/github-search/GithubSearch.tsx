import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { searchUserName } from "./GithubSearchAction";
import { LoadingState } from "./GithubSearchReducer";
import { SearchInput } from "./SearchInput";
import { SubmitButton } from "./SubmitButton";
import { Title } from "./Title";

type GithubSearchState = {
    userName: string,
};

type GithubSearchProps = {
    loadingStatus: LoadingState;
};

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

class GithubSearchClass extends React.PureComponent<GithubSearchProps, GithubSearchState> {
    constructor(props: GithubSearchProps) {
        super(props);
        this.state = {
            userName: "",
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({userName: event.target.value});
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // this.props.searchUserName(this.state.userName);
        event.preventDefault();
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Title/>
                <SearchInput
                    onChange={this.onChange}
                    value={this.state.userName}
                />
                <SubmitButton
                    isDisabled={!USERNAME_REGEX.test(this.state.userName)}
                />
                {this.props.loadingStatus}
            </form>
        );
    }
}
const mapStateToProps = (state: AppState) => ({
    loadingStatus: state.githubSearch.loadingStatus,
});

export const GithubSearch = connect(mapStateToProps)(GithubSearchClass);
