import API from '@/api/network/user';

export default async function checkUnAuthorized() {
  await API.getUserProfile();
}
