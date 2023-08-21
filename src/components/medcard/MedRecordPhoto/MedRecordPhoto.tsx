import { AiOutlineFullscreen } from 'react-icons/ai';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './MedRecordPhoto.module.scss';

interface MedRecordPhotoProps {
  photo: string;
  onClick: () => void;
}

const cx = bindStyles(styles);

const MedRecordPhoto = ({ photo, onClick }: MedRecordPhotoProps) => (
  <div className={cx('container')}>
    <img className='image' src={photo} alt='Medcard record' />
    <button className={cx('fullscreenButton')} onClick={onClick}>
      <AiOutlineFullscreen size={36} color='inherit' />
    </button>
  </div>
);

export default MedRecordPhoto;
