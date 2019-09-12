import { Dispatch } from "redux";
export const SET_LOADING_STATUS = "SET_LOADING_STATUS";

export const searchUserName = (username: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatus());
    };
};

interface SetLoadingStatusAction {
    type: typeof SET_LOADING_STATUS;
}

export const setLoadingStatus = (): SetLoadingStatusAction => ({
    type: SET_LOADING_STATUS,
});

export type GithubSearchActionType = SetLoadingStatusAction;
