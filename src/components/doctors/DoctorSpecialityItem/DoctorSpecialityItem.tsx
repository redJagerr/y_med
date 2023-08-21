import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { WithKey } from '@/types';

import styles from './DoctorSpecialityItem.module.scss';

const cx = bindStyles(styles);

interface DoctorSpecialityItemProps extends WithKey {
  speciality: string;
  onClick: () => void;
}

const DoctorSpecialityItem = ({ speciality, onClick }: DoctorSpecialityItemProps) => (
  <li className={cx('speciality')}>
    <button className={cx('specialityButton')} onClick={onClick}>
      {speciality}
    </button>
  </li>
);

export default DoctorSpecialityItem;
