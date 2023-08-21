import cn from 'classnames';
import { BiLoaderAlt } from 'react-icons/bi';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  fullScreen?: boolean;
}

const cx = bindStyles(styles);

const Loader = ({ className = '', fullScreen }: LoaderProps) => (
  <div
    className={cn(
      className,
      cx('container', {
        fullScreen
      })
    )}
  >
    <BiLoaderAlt className={cx('rotating')} color='inherit' size={56} />
  </div>
);

export default Loader;
