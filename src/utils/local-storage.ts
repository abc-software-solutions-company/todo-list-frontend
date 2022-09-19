const generateLocalStorage = (name: string) => {
  return {
    get: () => localStorage.getItem(name),
    set: (value: string) => localStorage.setItem(name, value),
    remove: () => localStorage.removeItem(name)
  };
};
const LocalStorage = {
  accessToken: generateLocalStorage('accessToken'),
  previousPage: generateLocalStorage('previousPage')
};
export default LocalStorage;
