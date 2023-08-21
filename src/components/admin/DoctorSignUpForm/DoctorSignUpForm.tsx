import { DatePicker, Select } from 'antd';
import cnBind from 'classnames/bind';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiFemaleSign } from 'react-icons/bi';
import { FaNotesMedical, FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineCalendar, HiOutlinePhone } from 'react-icons/hi';
import { MdAlternateEmail, MdCurrencyRuble, MdWorkOutline } from 'react-icons/md';
import { RiLockPasswordFill, RiStethoscopeLine } from 'react-icons/ri';

import { SignUpFormData } from '@/components/auth/SignUpForm';
import Button from '@/components/UI/Button/Button';
import { useError } from '@/src/hooks/useError';
import { useSuccess } from '@/src/hooks/useSuccess';
import { signUpDoctor } from '@/src/utils/helpers/api/user';
import { FileWithPreview, FormStatus, Qualification, QualificationType } from '@/types';

import Dropzone from '../../shared/Dropzone/Dropzone';
import SelectedImagePreviewItem from '../../shared/SelectedImagePreviewItem/SelectedImagePreviewItem';
import SuccessMessage from '../../shared/SuccessMessage/SuccessMessage';
import DoctorQualificationForm from '../DoctorQualificationForm/DoctorQualificationForm';
import DoctorQualificationItem from '../DoctorQualificationItem/DoctorQualificationItem';

import styles from './DoctorSignUpForm.module.scss';

interface DoctorSignUpFormData extends SignUpFormData {
  seniority: string;
  tags: string;
  price: string;
  speciality: string;
  scheduleStart: string;
  scheduleEnd: string;
  interval: string;
  weekend: string;
  birthDate: number;
}

const sexOptions = [
  {
    value: 'Мужской',
    label: 'Мужской'
  },
  {
    value: 'Женский',
    label: 'Женский'
  }
];

const cx = cnBind.bind(styles);

const DoctorSignUpForm = () => {
  const [expirience, setExpirience] = useState<Qualification[]>([]);
  const [education, setEducation] = useState<Qualification[]>([]);
  const [status, setStatus] = useState<FormStatus>('idle');

  const [image, setImage] = useState<FileWithPreview | null>(null);

  const modalRef = useRef(null);

  const {
    reset,
    register,
    handleSubmit,
    setFocus,
    control,
    formState: { isValid }
  } = useForm<DoctorSignUpFormData>({
    mode: 'onSubmit'
  });

  const onSuccess = () => {
    setExpirience([]);
    setEducation([]);
    setImage(null);
    reset();
    setStatus('idle');
  };
  const onError = () => setStatus('idle');

  useSuccess({ status, onSuccess });
  useError({ status, onError });

  const handleQualification = (qualificationData: Qualification, type: QualificationType) => {
    if (type === 'expirience') {
      const updatedExpirience = [...expirience, qualificationData];
      setExpirience(updatedExpirience);
    } else if (type === 'education') {
      const updatedEducation = [...education, qualificationData];
      setEducation(updatedEducation);
    }
  };

  useEffect(() => {
    setFocus('name');
  }, []);

  const onSubmit = (data: DoctorSignUpFormData) => {
    const {
      seniority,
      tags,
      price,
      speciality,
      scheduleStart,
      scheduleEnd,
      interval,
      weekend,
      birthDate,
      ...dataNoSchedule
    } = data;

    const fullData = {
      ...dataNoSchedule,
      birthDate: new Date(birthDate),
      seniority: Number(seniority),
      price: Number(price),
      expirience,
      education,
      averageRating: '0',
      photoFile: image!,
      tags: tags.split(','),
      speciality: speciality.split(','),
      schedule: {
        scheduleStart,
        scheduleEnd,
        interval: Number(interval),
        weekend: weekend.split(',').map((day: string) => Number(day)),
        days: []
      }
    };
    signUpDoctor({ data: fullData, setStatus });
  };

  const addImage = (files: FileWithPreview[]) => {
    setImage(files[0]);
  };
  const removeImage = () => {
    setImage(null);
  };

  const deleteEducation = (title: string) => {
    const filteredEducation = education.filter((item) => item.title !== title);
    setEducation(filteredEducation);
  };
  const deleteExpirience = (title: string) => {
    const filteredExpirience = expirience.filter((item) => item.title !== title);
    setExpirience(filteredExpirience);
  };

  const expirienceItems = expirience.map(({ title, year }) => (
    <DoctorQualificationItem title={title} year={year} onClick={() => deleteExpirience(title)} />
  ));

  const educationItems = education.map(({ title, year }) => (
    <DoctorQualificationItem title={title} year={year} onClick={() => deleteEducation(title)} />
  ));

  if (status === 'success') return <SuccessMessage />;

  return (
    <>
      <h2>Добавить профиль доктора</h2>
      <div className={cx('mainWrapper')} ref={modalRef}>
        <form className={cx('formWrapper')} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx('sectionContainer')}>
            <div className={cx('inputsWrapper')}>
              <h3 className={cx('title')}>Личные данные</h3>
              <div className='inputWrapper'>
                <FaRegUserCircle size={24} />
                <input
                  className='input inputFull'
                  type='text'
                  placeholder='Полное имя'
                  {...register('name')}
                />
              </div>
              <div className={cx('inputWrapper')}>
                <HiOutlinePhone size={24} />
                <input
                  className='input inputFull'
                  type='tel'
                  placeholder='+7(999)-999-99-99'
                  {...register('phone')}
                />
              </div>
              <div className='inputWrapper'>
                <HiOutlineCalendar size={24} />
                <Controller
                  name='birthDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <>
                      <DatePicker
                        placeholder='Дата...'
                        className='w-full'
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          field.onChange(date ? date.valueOf() : null);
                        }}
                      />
                      {fieldState.error ? (
                        <span className='error'>{fieldState.error?.message}</span>
                      ) : null}
                    </>
                  )}
                />
              </div>
              <div className='inputWrapper'>
                <BiFemaleSign size={24} />
                <Controller
                  name='sex'
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        placeholder='Выберите пол'
                        optionFilterProp='children'
                        value={field.value}
                        onChange={(sex) => {
                          field.onChange(sex ? sex.valueOf() : null);
                        }}
                        options={sexOptions}
                      />
                      {fieldState.error ? (
                        <span className='error'>{fieldState.error?.message}</span>
                      ) : null}
                    </>
                  )}
                />
              </div>
            </div>

            <div className={cx('inputsWrapper')}>
              <h3 className={cx('title')}>Профессиональные данные</h3>
              <div className='inputWrapper'>
                <MdWorkOutline size={24} />
                <input
                  className='input'
                  type='number'
                  placeholder='Стаж'
                  {...register('seniority', { required: true })}
                />
              </div>
              <div className='inputWrapper'>
                <RiStethoscopeLine size={24} />
                <input
                  className='input'
                  type='text'
                  placeholder='Тэги'
                  {...register('tags', { required: true })}
                />
              </div>
              <div className='inputWrapper'>
                <FaNotesMedical size={24} />
                <input
                  className='input'
                  type='text'
                  placeholder='Специализация'
                  {...register('speciality', { required: true })}
                />
              </div>
              <div className='inputWrapper'>
                <MdCurrencyRuble size={24} />
                <input
                  className='input'
                  type='number'
                  placeholder='Цена'
                  {...register('price', { required: true })}
                />
              </div>
            </div>
            <div className={cx('inputsWrapper')}>
              <h3 className={cx('title')}>График:</h3>
              <div className={cx('inputsWrapper')}>
                <input
                  className='input'
                  type='text'
                  placeholder='Начало дня'
                  {...register('scheduleStart', { required: true })}
                />
                <input
                  className='input'
                  type='text'
                  placeholder='Конец дня'
                  {...register('scheduleEnd', { required: true })}
                />
                <input
                  className='input'
                  type='number'
                  placeholder='Интервал'
                  {...register('interval', { required: true })}
                />
                <input
                  className='input'
                  type='text'
                  placeholder='Выходные (через запятую)'
                  {...register('weekend', { required: true })}
                />
              </div>
            </div>
            <div className={cx('inputsWrapper')}>
              <h3 className={cx('title')}>Фото профиля:</h3>
              {image !== null ? (
                <SelectedImagePreviewItem preview={image.preview} onClick={removeImage} />
              ) : (
                <Dropzone setSelectedImages={addImage} full />
              )}{' '}
            </div>
          </div>
          <h3 className={cx('title')}>Квалификация</h3>
          <DoctorQualificationForm handleClick={handleQualification} />
          <div className={cx('qualificationContainer')}>
            <h3 className={cx('qualificationTitle')}>Образование:</h3>{' '}
            <ul className={cx('qualificationList')}>{educationItems}</ul>
          </div>

          <div className={cx('qualificationContainer')}>
            <h3 className={cx('qualificationTitle')}>Опыт:</h3>{' '}
            <ul className={cx('qualificationList')}>{expirienceItems}</ul>
          </div>
          <div className={cx('userDataContainer')}>
            <h3 className={cx('title')}>Данные пользователя:</h3>
            <div className='inputWrapper'>
              <MdAlternateEmail size={24} />
              <input
                className='input'
                type='email'
                placeholder='Email'
                {...register('email', { required: 'Email обязателен' })}
              />
            </div>
            <div className='inputWrapper'>
              <RiLockPasswordFill size={24} />
              <input
                className='input'
                type='password'
                placeholder='Пароль'
                {...register('password', {
                  required: 'Пароль обязателен!',
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов'
                  }
                })}
              />
            </div>
          </div>
          <Button className={cx('register')} disabled={!isValid}>
            {status === 'loading' ? 'Загрузка...' : 'Зарегистрировать'}
          </Button>
        </form>
        {status === 'error' && <span className='error'>Ошибка при добавлении доктора</span>}
      </div>
    </>
  );
};
export default DoctorSignUpForm;
