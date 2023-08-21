import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useEffect } from 'react';

import { auth } from '@/@firebase';
import Loader from '@/src/components/shared/Loader/Loader';
import Navbar from '@/src/components/shared/Navbar/Navbar';
import { useAppDispatch } from '@/src/hooks/redux';
import { useLoading } from '@/src/hooks/useLoading';
import { removeUser, setFirebaseUser } from '@/src/redux/slices/authSlice';
import { UserType } from '@/types';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const userType = router.asPath.split(/[/?]/)[1];
  const dispatch = useAppDispatch();
  useEffect(
    () =>
      auth.onIdTokenChanged(async (user) => {
        if (!user) {
          dispatch(removeUser());
          nookies.set(undefined, 'token', '', { path: '/' });
          router.push('/');
        } else {
          const token = await user.getIdToken();
          dispatch(setFirebaseUser(user));
          nookies.set(undefined, 'token', token, { path: '/' });
        }
      }),
    []
  );
  const { loading } = useLoading();

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <div className='container'>
      <Navbar type={userType as UserType} />
      <main className='relative'>{loading ? <Loader fullScreen /> : children}</main>
    </div>
  );
};

export default Layout;
