import { bindStyles } from '@/src/utils/helpers/bindStyles';
import declarationOfNumber from '@/src/utils/helpers/declarationOfNumber';

import styles from './DoctorAccountHeader.module.scss';

interface DoctorAccountHeaderProps {
  name: string;
  photoUrl: string;
  appointmentsNumber: number;
}

const cx = bindStyles(styles);

const DoctorAccountHeader = ({ name, photoUrl, appointmentsNumber }: DoctorAccountHeaderProps) => (
  <div className={cx('container')}>
    <div className={cx('photoContainer')}>
      <img className='image' src={photoUrl!} alt='' />
    </div>
    <div className={cx('mainContainer')}>
      <span className={cx('name')}>{name}</span>
      <span className={cx('appointments')}>
        В этот день у вас{' '}
        <span className={cx('appointmentsNumber')}>
          {appointmentsNumber}{' '}
          {declarationOfNumber(appointmentsNumber, ['запись', 'записи', 'записей'])}
        </span>
      </span>
    </div>
  </div>
);

export default DoctorAccountHeader;
