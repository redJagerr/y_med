import { Select } from 'antd';
import { useRouter } from 'next/router';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import DoctorsInput from '../DoctorsInput/DoctorsInput';

import styles from './DoctorsSearch.module.scss';

const options = [
  { value: 'averageRating', label: 'По рейтингу' },
  { value: 'seniority', label: 'По стажу' },
  { value: 'price', label: 'По цене' }
];

const cx = bindStyles(styles);

const DoctorsSearch = () => {
  const router = useRouter();

  const handleChange = (value: string) => {
    router.query.sort = value;
    router.push(router);
  };

  return (
    <div className={cx('container')}>
      <DoctorsInput />
      <div className={cx('sortContainer')}>
        <span>Сортировать</span>
        <Select
          defaultValue='averageRating'
          className={cx('sort')}
          onChange={handleChange}
          options={options}
        />
      </div>
    </div>
  );
};

export default DoctorsSearch;
