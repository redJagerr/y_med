import { Patient } from '@prisma/client';
import { signOut } from 'firebase/auth';
import { GetServerSideProps } from 'next';

import { auth } from '@/@firebase';
import PatientProfileInfo from '@/src/components/patient/PatientProfileInfo/PatientProfileInfo';
import Button from '@/src/components/UI/Button/Button';
import { useAppDispatch } from '@/src/hooks/redux';
import { removeUser } from '@/src/redux/slices/authSlice';
import { getUidFromToken } from '@/src/utils/helpers/api/getUidFromToken';
import { getUser } from '@/src/utils/helpers/api/user';

import styles from './ProfilePage.module.scss';

interface ProfilePageProps {
  profile: Patient;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const uid = await getUidFromToken(ctx);
    const data = await getUser({ uid, type: 'patient' });
    return { props: { profile: data } };
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return { props: {} as never };
  }
};

const ProfilePage = ({ profile }: ProfilePageProps) => {
  const dispatch = useAppDispatch();
  const handleSignout = async () => {
    await signOut(auth);
    dispatch(removeUser());
  };

  const { name, phone, birthDate, email, sex, photoUrl } = profile;

  return (
    <section className={styles.container}>
      <PatientProfileInfo
        name={name}
        phone={phone}
        birthDate={birthDate}
        email={email}
        sex={sex}
        photoUrl={photoUrl}
      />
      <Button onClick={handleSignout}>Выйти</Button>
    </section>
  );
};

export default ProfilePage;
