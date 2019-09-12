import * as React from "react";

type UserDetailsProps = {
    userInfo: {
        avatar_url: string
        bio: string | null,
        name: string,
        repos_url: string,
    },
    userName: string,
};
type reposDetails = {
    id: number,
    name: string,
    url: string,
};

type UserDetailsState = {
    starredRepos: reposDetails[],
};

const LINKS_COUNT = 3;

export class UserDetails extends React.PureComponent<UserDetailsProps, UserDetailsState> {
    constructor(props: UserDetailsProps) {
        super(props);
        this.state = {
            starredRepos: [],
        };
    }

    public async componentDidMount() {
        const url = `https://api.github.com/users/${this.props.userName}/repos?sort=stars&order=desc`;
        const response = await fetch(url);
        const result = await response.json();
        const topResult = result.slice(0, LINKS_COUNT);
        const topResultMap = topResult.map((repository: { name: string, html_url: string, id: number }) => ({
            id: repository.id,
            name: repository.name,
            url: repository.html_url,
        }));
        this.setState({
            starredRepos: topResultMap,
        });
    }

    public render() {
        const { avatar_url, bio, name } = this.props.userInfo;

        return (
            <div className="user-details">
                <div className="user-name">{name}</div>
                <img src={avatar_url} width={100} height={100}></img>
                <div className="description">{bio}</div>
                {
                    this.state.starredRepos.length > 0 && <>
                        <i>Most popular repositories:</i>
                        {
                            this.state.starredRepos.map((repo) => (
                                <a key={repo.id} href={repo.url}>{repo.name}</a>
                            ))
                        }
                    </>
                }
            </div>
        );
    }
}
