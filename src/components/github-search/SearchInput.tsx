import * as React from "react";

type SearchInputProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
};

export const SearchInput = (props: SearchInputProps) => <input
    className="search-input"
    type="text"
    placeholder="User name"
    value={props.value}
    onChange={props.onChange}
/>;
