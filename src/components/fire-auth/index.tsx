import Button from '@/core-ui/button';
import {FireAuthUtils} from '@/lib/firebase/fireAuth-utils';

const fireAuthUtils = new FireAuthUtils();

const FirebaseAuth = () => {
  return (
    <>
      <Button
        className="btn-submit"
        variant="contained"
        color="primary"
        type="submit"
        text="Login Google"
        onClick={() => fireAuthUtils.signInWithGoogle()}
      />
      <Button
        className="btn-submit"
        variant="contained"
        color="primary"
        type="submit"
        text="Logout Google"
        onClick={() => fireAuthUtils.signOutOfGoogle()}
      />
    </>
  );
};

export default FirebaseAuth;
