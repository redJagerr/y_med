import { Select } from 'antd';
import cn from 'classnames';
import cnBind from 'classnames/bind';
import { useState } from 'react';

import { Qualification, QualificationType } from '@/types';

import Button from '../../UI/Button/Button';

import styles from './DoctorQualificationForm.module.scss';

interface SignUpFormProps {
  handleClick: (qualificationData: Qualification, type: QualificationType) => void;
}

const qualificationOptions = [
  {
    value: 'education',
    label: 'Образование'
  },
  {
    value: 'expirience',
    label: 'Опыт работы'
  }
];

const cx = cnBind.bind(styles);

const DoctorQualificationForm = ({ handleClick }: SignUpFormProps) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [qualificationType, setQualificationType] = useState<QualificationType>('education');

  const onSubmit = () => {
    const data = {
      title,
      year
    };
    handleClick(data, qualificationType);
  };

  const isValid = title && year;

  return (
    <div className={cx('container')}>
      <Select
        className={cx('select')}
        defaultValue={qualificationType}
        options={qualificationOptions}
        onChange={setQualificationType}
      />

      <input
        className={cn('input', cx('year'))}
        type='number'
        placeholder='Год'
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        className={cn('input', cx('descriptionText'))}
        type='text'
        placeholder='Описание'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button className={cx('add')} disabled={!isValid} onClick={onSubmit}>
        Добавить
      </Button>
    </div>
  );
};
export default DoctorQualificationForm;
