import * as React from "react";

type SubmitButtonProps = {
    isDisabled: boolean,
};

export const SubmitButton = (props: SubmitButtonProps) => <input
    className="submit-button"
    disabled={props.isDisabled}
    type="submit"
    value="Search"
/>;
