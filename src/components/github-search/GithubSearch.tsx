import * as React from "react";

type GithubSearchState = {
    userName: string,
};

export class GithubSearch extends React.PureComponent<{}, GithubSearchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userName: "",
        };
        this.onChange = this.onChange.bind(this);
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({userName: event.target.value});
    }

    public render() {
        return (
            <>
                <input
                    type="text"
                    placeholder="GitHub user name"
                    value={this.state.userName}
                    onChange={this.onChange}
                />
            </>
        );
    }
}
