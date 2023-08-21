import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { FaPills } from 'react-icons/fa';

import { auth } from '@/@firebase';
import Button from '@/components/UI/Button/Button';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { UserType } from '@/types';

import styles from './Navbar.module.scss';

interface NavbarProps {
  type?: UserType;
}

const mainPageLinkMap = {
  patient: '/patient?page=1',
  doctor: '/doctor',
  admin: '/admin'
};

const cx = bindStyles(styles);

const Navbar = ({ type }: NavbarProps) => {
  const isPatient = type === 'patient';

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const mainPageLink = type ? mainPageLinkMap[type] : '/';
  return (
    <header className={cx('container')}>
      <Link href={mainPageLink} className={cx('logo')}>
        YourMed
        <FaPills />
      </Link>
      {type && isPatient && (
        <nav className={cx('navigation')}>
          <Link className={cx('link')} href='/patient?page=1'>
            Главная
          </Link>
          <Link className={cx('link')} href='/patient/appointments?page=1&sort=averageRating'>
            Запись
          </Link>
          <Link className={cx('link')} href='/patient/medhistory?sort=all'>
            Медкарта
          </Link>
          <Link className={cx('link')} href='/patient/profile'>
            Профиль
          </Link>
        </nav>
      )}
      {!isPatient && type && <Button onClick={handleSignOut}>Выйти</Button>}
    </header>
  );
};

export default Navbar;
