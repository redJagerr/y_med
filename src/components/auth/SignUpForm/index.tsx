import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiFemaleSign } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineCalendar, HiOutlinePhone } from 'react-icons/hi';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import { HandleSignUp } from '@/pages';
import { bindStyles } from '@/src/utils/helpers/bindStyles';

import Button from '../../UI/Button/Button';

import styles from './SignUpForm.module.scss';

export interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  phone: string;
  birthDate: number;
  sex: string;
}

interface SignUpFormProps {
  title: string;
  handleClick: ({ email, name, password, phone, birthDate, sex }: HandleSignUp) => void;
  buttonName: string;
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

const cx = bindStyles(styles);

const SignUpForm = ({ title, handleClick, buttonName }: SignUpFormProps) => {
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    setFocus,
    control,
    formState: { errors, isValid }
  } = useForm<SignUpFormData>({
    mode: 'onSubmit'
  });

  useEffect(() => {
    setFocus('name');
  }, []);

  const onSubmit = (data: SignUpFormData) => {
    if (typeof data.birthDate === 'number') {
      const birthDate = new Date(data.birthDate);
      handleClick({ ...data, birthDate });
    }
  };

  return (
    <div className={cx('container')} ref={modalRef}>
      <h2 className={cx('title')}>{title}</h2>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
        <div className='inputWrapper'>
          <FaRegUserCircle size={24} />
          <input className='input' type='text' placeholder='Полное имя' {...register('name')} />
        </div>
        <div className='inputWrapper'>
          <HiOutlinePhone size={24} />
          <input
            className='input'
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
        <div className='inputWrapper'>
          <MdAlternateEmail size={24} />
          <input
            className='input'
            type='email'
            placeholder='Email'
            {...register('email', { required: 'Email обязателен' })}
          />
        </div>
        {errors?.email && <span>{errors?.email?.message || 'Email обязателен'}</span>}
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
        {errors?.password && <span>{errors?.password?.message}</span>}
        <Button className={cx('submit')} disabled={!isValid}>
          {buttonName}
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
