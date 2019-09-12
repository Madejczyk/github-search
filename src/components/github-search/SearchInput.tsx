import * as React from "react";

type SearchInputProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
};

export const SearchInput = (props: SearchInputProps) => <input
    type="text"
    placeholder="GitHub user name"
    value={props.value}
    onChange={props.onChange}
/>;
