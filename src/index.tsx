import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { configureStore } from "./store";

const store = configureStore();

const Root = () => <Provider store={store}>
    <App />
</Provider>;

ReactDOM.render(<Root/>, document.getElementById("app"));
