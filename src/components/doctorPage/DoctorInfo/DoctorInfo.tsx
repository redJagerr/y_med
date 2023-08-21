import { Education, Expirience } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './DoctorInfo.module.scss';

interface DoctorInfoProps {
  education: Education[];
  speciality: string[];
  expirience: Expirience[];
}

const cx = bindStyles(styles);

const DoctorInfo = ({ education, speciality, expirience }: DoctorInfoProps) => {
  const renderSpeciality = () =>
    speciality.map((specialityItem) => <li key={uuid()}> ~ {specialityItem}</li>);

  const renderDoctorInfo = (infoArray: Education[] | Expirience[]) =>
    infoArray.map(({ id, doctorId, year, title }) => (
      <li className={cx('infoItem')} key={doctorId + id + year}>
        <span>{year}</span>
        <span>{title}</span>
        <div className={cx('mark')} />
      </li>
    ));

  const educationItems = renderDoctorInfo(education);
  const expirienceItems = renderDoctorInfo(expirience);

  return (
    <section className={cx('container')}>
      <h3 className={cx('title')}>Специализация</h3>
      <ul>{renderSpeciality()}</ul>
      <h2 className={cx('title')}>Образование</h2>
      <ul className={cx('infoList')}>{educationItems}</ul>
      <h3 className={cx('title')}>Опыт</h3>
      <ul className={cx('infoList')}>{expirienceItems}</ul>
    </section>
  );
};

export default DoctorInfo;
