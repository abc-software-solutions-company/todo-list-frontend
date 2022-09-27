import Link from 'next/link';

import FirebaseAuth from '@/components/fire-auth/index';

const Auth = () => {
  return (
    <div>
      <div>
        <FirebaseAuth />
        <p>
          <Link href={'/'}>Go Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
