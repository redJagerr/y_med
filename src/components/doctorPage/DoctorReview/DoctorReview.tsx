import { Reviews } from '@prisma/client';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';
import { WithKey } from '@/types';

import styles from './DoctorReview.module.scss';

interface DoctorReviewProps extends WithKey, Omit<Reviews, 'id' | 'patientId' | 'doctorId'> {
  name: string;
}

const cx = bindStyles(styles);

const DoctorReview = ({ name, date, rating, text }: DoctorReviewProps) => {
  const [isFull, setFull] = useState(false);
  const isLongText = text.length > 50;

  const handleClick = () => setFull(!isFull);

  return (
    <li className={cx('container')}>
      <div className={cx('info')}>
        <span className={cx('name')}>{name}</span>
        <span className={cx('date')}>{getStringFromDate(date, 'short')}</span>{' '}
        <div className={cx('ratingContainer')}>
          <span className={cx('rating')}>{rating}</span>
          <AiFillStar color='#fcbb52fc' size={15} />
        </div>
      </div>
      <div className={cx('text')}>
        {isLongText && !isFull ? `${text.slice(0, 50)}...` : text}{' '}
        {isLongText && (
          <button className={cx('more')} onClick={handleClick}>
            {isFull ? 'скрыть' : 'читать весь отзыв'}
          </button>
        )}
      </div>
    </li>
  );
};

export default DoctorReview;
