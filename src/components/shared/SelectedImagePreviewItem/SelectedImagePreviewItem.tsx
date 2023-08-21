import { RiCloseFill } from 'react-icons/ri';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './SelectedImagePreviewItem.module.scss';

interface SelectedImagePreviewItemProps {
  preview: string;
  onClick: () => void;
}

const cx = bindStyles(styles);

const SelectedImagePreviewItem = ({ preview, onClick }: SelectedImagePreviewItemProps) => (
  <div className={cx('container')}>
    <img className='image' src={preview} alt='filePreview' />
    <button className={cx('delete')} onClick={onClick}>
      <RiCloseFill size={16} color='inherit' />
    </button>
  </div>
);

export default SelectedImagePreviewItem;
