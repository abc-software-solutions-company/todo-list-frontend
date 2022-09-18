export default function useLocalStorage() {
  const get = (key: string) => {
    return localStorage.getItem(key);
  };

  const set = (key: string, value: any) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key: string) => {
    return localStorage.removeItem(key);
  };

  const readToken = () => {
    const accessTokenLength = get('accessToken')?.length || 0;
    return get('accessToken')?.substring(3, accessTokenLength - 3);
  };

  const saveToken = (data: string) => {
    return set('accessToken', JSON.stringify(data));
  };

  const removeToken = () => {
    return remove('accessToken');
  };

  const saveUserProfile = (data: string) => {
    return set('user', data);
  };

  const removeUserProfile = () => {
    return remove('user');
  };

  const readPreviousLink = () => {
    return get('previousPage');
  };

  const savePreviousLink = (data: string) => {
    return set('previousPage', data);
  };

  const removePreviousLink = () => {
    return remove('previousPage');
  };

  return {
    readToken,
    saveToken,
    saveUserProfile,
    removeUserProfile,
    removeToken,
    readPreviousLink,
    savePreviousLink,
    removePreviousLink
  };
}
