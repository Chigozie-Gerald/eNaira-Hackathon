import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import thunk from "redux-thunk";
import rootReducer from "./state_management/reducers";
import rootEpic from "./state_management/epics";
import { StateLoader } from "./state_management";

export type stateType = Exclude<Parameters<typeof rootReducer>[0], undefined>;

const epicMiddleware = createEpicMiddleware();
const stateLoader = new StateLoader();
const initialState = stateLoader.loadState();

const middleware = [epicMiddleware, thunk];
export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

epicMiddleware.run(rootEpic);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
