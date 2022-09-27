export interface IAuth {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  xa: string;
}

export const mapUserData = (user: IAuth) => {
  const {uid, email, xa, displayName, photoUrl} = user;
  return {
    id: uid,
    email,
    token: xa,
    name: displayName,
    profilePic: photoUrl
  };
};
