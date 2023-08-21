import { MdDone } from 'react-icons/md';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './SuccessMessage.module.scss';

const cx = bindStyles(styles);

const SuccessMessage = () => (
  <div className={cx('container')}>
    <div className={cx('icon')}>
      <MdDone size={50} color='inherit' />
    </div>
    <h3 className={cx('title')}>Успешно</h3>
  </div>
);

export default SuccessMessage;
