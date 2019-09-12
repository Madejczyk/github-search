import * as React from "react";

type SubmitButtonProps = {
    isDisabled: boolean,
};

export const SubmitButton = (props: SubmitButtonProps) => <input
    disabled={props.isDisabled}
    type="submit"
    value="Search"
/>;
