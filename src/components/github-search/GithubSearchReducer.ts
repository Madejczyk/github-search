import { GithubSearchActionType, SET_LOADING_STATUS } from "./GithubSearchAction";

export enum LoadingState {
    NOT_LOADED = "NOT_LOADED",
    LOADING = "LOADING",
    LOADED = "LOADED",
    ERROR = "ERROR",
}

const initialState = {
    loadingStatus: LoadingState.NOT_LOADED,
};

export const githubSearchReducer = (state = initialState, action: GithubSearchActionType) => {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {...state, loadingStatus: LoadingState.LOADING};
        default:
            return state;
    }
};
