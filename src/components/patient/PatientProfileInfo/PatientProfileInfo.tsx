import { Patient } from '@prisma/client';
import cnBind from 'classnames/bind';
import { BiFemaleSign } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineCalendar, HiOutlinePencil, HiOutlinePhone } from 'react-icons/hi';
import { MdAlternateEmail } from 'react-icons/md';

import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';

import styles from './PatientProfileInfo.module.scss';

const cx = cnBind.bind(styles);

const PatientProfileInfo = ({
  name,
  phone,
  birthDate,
  email,
  sex,
  photoUrl
}: Omit<Patient, 'uid'>) => (
  <>
    <div className={cx('avatar')}>
      {photoUrl ? (
        <img className='image' src={photoUrl} alt='Фото пациента' />
      ) : (
        <FaUserAlt color='inherit' size={50} />
      )}
    </div>
    <ul className={cx('listInfo')}>
      <li className={cx('itemInfo')}>
        <HiOutlinePhone size={24} />
        <span>{phone}</span>
      </li>
      <li className={cx('itemInfo')}>
        <HiOutlinePencil size={24} />
        <div>
          <span className={cx('title')}>ФИО:</span> {name}
        </div>
      </li>
      <li className={cx('itemInfo')}>
        <HiOutlineCalendar size={24} />
        <div>
          <span className={cx('title')}>Дата рождения:</span>{' '}
          {getStringFromDate(new Date(birthDate), 'short')}
        </div>
      </li>
      <li className={cx('itemInfo')}>
        <MdAlternateEmail size={24} />
        <div>
          <span className={cx('title')}>Email:</span> {email}
        </div>
      </li>
      <li className={cx('itemInfo')}>
        <BiFemaleSign size={24} />
        <div>
          <span className={cx('title')}>Пол:</span> {sex}
        </div>
      </li>
    </ul>
  </>
);

export default PatientProfileInfo;
