export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('state');
      if (serializedState === null) {
        return {};
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return {};
    }
  }; 

export const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);    
};