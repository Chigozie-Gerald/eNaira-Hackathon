import { stateType } from "..";

export class StateLoader {
  loadState() {
    try {
      let serializedState = sessionStorage.getItem("ROOT_STATE");

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state: stateType) {
    try {
      let serializedState = JSON.stringify(state);
      sessionStorage.setItem("ROOT_STATE", serializedState);
    } catch (err) {}
  }

  initializeState() {
    return {
      //state object
    };
  }
}
