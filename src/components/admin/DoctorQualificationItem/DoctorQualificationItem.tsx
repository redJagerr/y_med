import { v4 as uuid } from 'uuid';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './DoctorQualificationItem.module.scss';

interface DoctorQualificationItemProps {
  year: string;
  title: string;
  onClick: () => void;
}

const cx = bindStyles(styles);

const DoctorQualificationItem = ({ year, title, onClick }: DoctorQualificationItemProps) => (
  <li className={cx('container')} key={uuid()}>
    Год: {year}, Описание: {title}
    <button className={cx('deleteQualification')} onClick={onClick}>
      x
    </button>
  </li>
);

export default DoctorQualificationItem;
