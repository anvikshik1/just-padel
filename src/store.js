import rootReducer from "../src/components/Redux/Reducer";

import { createStore } from "redux";
const store = createStore(rootReducer, window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_());
export default store;