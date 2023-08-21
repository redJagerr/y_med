import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

import Button from '@/components/UI/Button/Button';
import { bindStyles } from '@/src/utils/helpers/bindStyles';

import DoctorSpecialityItem from '../DoctorSpecialityItem/DoctorSpecialityItem';

import styles from './DoctorsInput.module.scss';

const doctorsSpecialitiesArrays = [
  'Хирург',
  'Терапевт',
  'Онколог',
  'Эндокринолог',
  'Лор',
  'Дерматолог',
  'Абдоминальный хирург'
];

const cx = bindStyles(styles);

const DoctorsInput = () => {
  const [value, setValue] = useState('');
  const [isResultsVisible, setResultsVisible] = useState(false);
  const [filteredResutls, setFilteredResutls] = useState(doctorsSpecialitiesArrays);
  const router = useRouter();

  useEffect(() => {
    const result = doctorsSpecialitiesArrays
      .sort()
      .filter((i) => i.toLowerCase().includes(value.toLowerCase()));
    setFilteredResutls(result);
  }, [value]);

  const handleClick = () => {
    router.query.speciality = value;
    router.push(router);
  };

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleInputBlur = () => setTimeout(() => setResultsVisible(false), 100);

  const renderSpecialitiesList = filteredResutls.map((speciality) => (
    <DoctorSpecialityItem
      key={speciality}
      speciality={speciality}
      onClick={() => {
        setValue(speciality);
      }}
    />
  ));

  return (
    <div className={cx('container')}>
      <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
        <input
          className={cx('input')}
          type='text'
          placeholder='Найти врача...'
          value={value}
          onChange={handleValue}
          onFocus={() => setResultsVisible(true)}
          onBlur={handleInputBlur}
        />
        <ul hidden={!isResultsVisible} className={cx('specialities')}>
          {renderSpecialitiesList}
        </ul>
      </form>
      <Button onClick={handleClick}>Найти</Button>
    </div>
  );
};
export default DoctorsInput;
