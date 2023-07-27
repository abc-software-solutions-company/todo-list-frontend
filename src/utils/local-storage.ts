const generateLocalStorage = (name: string) => {
  return {
    get: () => localStorage.getItem(name),
    set: (value: string) => localStorage.setItem(name, value),
    remove: () => localStorage.removeItem(name)
  };
};
const LocalStorage = {
  accessToken: generateLocalStorage('accessToken'),
  listId: generateLocalStorage('listId'),
  previousPage: generateLocalStorage('previousPage'),
  checkPage: generateLocalStorage('checkPage'),
  clearAll: () => localStorage.clear()
};
export default LocalStorage;
