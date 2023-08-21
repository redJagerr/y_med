import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';

import { bindStyles } from '@/src/utils/helpers/bindStyles';
import declarationOfNumber from '@/src/utils/helpers/declarationOfNumber';
import { DoctorsFullInfo } from '@/types';

import styles from './DoctorOverview.module.scss';

interface DoctorOverviewProps extends DoctorsFullInfo {
  overview: boolean;
}

const cx = bindStyles(styles);

const DoctorOverview = ({
  overview,
  uid,
  name,
  price,
  phone,
  tags,
  photoUrl,
  averageRating,
  seniority,
  reviews
}: DoctorOverviewProps) => {
  const renderTags = () =>
    tags.map((tag, index) => (
      <li key={uid + tag} className={cx('tag')}>{`${tag} ${
        index + 1 !== tags.length ? '•' : ''
      }`}</li>
    ));
  const numberOfSeniority = declarationOfNumber(seniority, ['год', 'года', 'лет']);

  const reviewsNumber = overview ? null : (
    <span className={cx('reviews')}>{`${reviews.length} ${declarationOfNumber(reviews.length, [
      'отзыв',
      'отзыва',
      'отзывов'
    ])}`}</span>
  );

  const rate = (
    <div className={cx('ratingContainer')}>
      <span className={cx('rating', { ratingOverview: overview })}>{averageRating}</span>
      <AiFillStar color='#fcbb52fc' size={overview ? 20 : 15} />
    </div>
  );

  return (
    <div className={cx('container', { shadow: overview })}>
      <div className={cx('statsContainer')}>
        <div className={cx('photoContainer', { overview })}>
          <div className={cx('photo')}>
            <img className='image' src={photoUrl} alt='' />
          </div>
          {rate}
        </div>
        {reviewsNumber}
      </div>
      <div className={cx('main')}>
        <ul className={cx('tags')}>{renderTags()}</ul>
        <div className={cx('info')}>
          {overview ? (
            <span className={cx('mainText')}>{name}</span>
          ) : (
            <Link className={cx('mainText')} href={`/patient/appointments/${uid}/info`}>
              {name}
            </Link>
          )}
          <span className={cx('secondaryText')}>{`Стаж ${seniority} ${numberOfSeniority} `}</span>
          <span className={cx('mainText')}>от {price} ₽ </span>
          <div className={cx('phoneContainer')}>
            <span className={cx('secondaryText')}>Телефон для записи:</span>
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOverview;
