import * as React from "react";

export type UserDetailsProps = {
    userInfo: {
        avatar_url: string
        bio: string | null,
        name: string,
        repos_url: string,
    },
};

export class UserDetails extends React.PureComponent<UserDetailsProps> {
    public render() {
        const {avatar_url, bio, name} = this.props.userInfo;

        return (
            <div className="user-details">
                <div className="user-name">{name}</div>
                <img src={avatar_url} width={100} height={100}></img>
                <div className="description">{bio}</div>
            </div>
        );
    }
}
