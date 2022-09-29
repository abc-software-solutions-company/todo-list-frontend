import LocalStorage from '@/utils/local-storage';

function LogOutHandler() {
  LocalStorage.accessToken.remove();
  LocalStorage.firebaseAuthData.remove();
}
export default LogOutHandler;
