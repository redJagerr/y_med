import cnBind from 'classnames/bind';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { auth } from '@/@firebase';
import SignInForm, { SignInFormData } from '@/src/components/auth/SignInForm';
import SignUpForm, { SignUpFormData } from '@/src/components/auth/SignUpForm';
import Button from '@/src/components/UI/Button/Button';
import { addPatient, getUser } from '@/src/utils/helpers/api/user';
import { getDateWithoutTime } from '@/src/utils/helpers/getDateWithoutTime';
import { handleError } from '@/src/utils/helpers/handleError';
import { UserType } from '@/types';

import styles from './AuthPage.module.scss';

export interface HandleSignUp extends Omit<SignUpFormData, 'birthDate'> {
  birthDate: Date;
}

const userTypeMap = {
  admin: 'админ',
  patient: 'пациент',
  doctor: 'доктор'
};

const cx = cnBind.bind(styles);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const toggleIsLogin = () => setIsLogin(!isLogin);

  const isAdmin = userType === 'admin';
  const isPatient = userType === 'patient';
  const signInTitle = userTypeMap[userType];

  const handleUserType = () => {
    if (userType === 'patient') setUserType('doctor');
    else setUserType('patient');
  };

  const handleSignIn = ({ email, password }: SignInFormData) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const { uid } = user;
        const data = isAdmin ? true : await getUser({ uid, type: userType });
        if (!data) throw Error('Неверный тип пользователя');
        if (isPatient) router.push(`/patient?page=1&sort=averageRating`);
        else if (!isAdmin) router.push(`/doctor?date=${getDateWithoutTime()}`);
        else router.push(`/admin`);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setAuthError(handleError(error.message));
      });
  };

  const handleSignUp = (date: HandleSignUp) => {
    const { email, name, birthDate, phone, password, sex } = date;
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user: { uid } }) => {
        const userData = {
          email,
          name,
          birthDate,
          phone,
          sex,
          uid,
          photoUrl: ''
        };
        await addPatient(userData);
        setIsLoading(false);
        toggleIsLogin();
      })
      .catch((error) => {
        setIsLoading(false);
        setAuthError(handleError(error));
      });
  };

  return (
    <div className={cx('container')}>
      {isLogin ? (
        <SignInForm
          title={`Войти как ${signInTitle}`}
          handleClick={handleSignIn}
          buttonName={isLoading ? 'Загрузка...' : 'Войти'}
        />
      ) : (
        <SignUpForm
          title='Создать аккаунт'
          handleClick={handleSignUp}
          buttonName={isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
        />
      )}
      <span className='error'>{authError}</span>
      {isPatient && (
        <div>
          {isLogin ? `Нет аккаунта? ` : 'Есть аккаунт? '}
          <span
            className={cx('toggleFromButton')}
            onClick={toggleIsLogin}
            role='button'
            tabIndex={0}
          >
            {isLogin ? `Создать` : 'Войти'}
          </span>
        </div>
      )}
      <div className={cx('buttons')}>
        {isLogin && (
          <>
            <Button type='outline' size='small' onClick={handleUserType}>
              Войти как {isPatient ? 'доктор' : 'пациент'}
            </Button>
            <Button type='outline' size='small' onClick={() => setUserType('admin')}>
              Админ
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default AuthPage;
