class StateManager {
    constructor(initialState) {
        this.state = initialState;
        this.listeners = new Map();
    }

    setState(stateName, stateValue) {
        if (this.state[stateName] !== stateValue) {
            this.state[stateName] = stateValue;
            this.notifyListeners(stateName);
        }
    }

    getState(stateName) {
        return this.state[stateName];
    }

    subscribe(stateName, callback) {
        if (!this.listeners.has(stateName)) {
            this.listeners.set(stateName, new Set());
        }
        this.listeners.get(stateName).add(callback);
    }

    unsubscribe(stateName, callback) {
        if (this.listeners.has(stateName)) {
            this.listeners.get(stateName).delete(callback);
        }
    }

    notifyListeners(stateName) {
        if (this.listeners.has(stateName)) {
            this.listeners.get(stateName).forEach(callback => callback(this.state[stateName]));
        }
    }
}

export default StateManager;