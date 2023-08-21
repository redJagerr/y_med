import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import Button from '@/components/UI/Button/Button';
import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './SignInForm.module.scss';

export interface SignInFormData {
  email: string;
  name: string;
  password: string;
}

interface SignInFormProps {
  title: string;
  handleClick: ({ email, password }: SignInFormData) => void;
  buttonName: string;
}

const cx = bindStyles(styles);

const SignInForm = ({ title, handleClick, buttonName }: SignInFormProps) => {
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isValid }
  } = useForm<SignInFormData>({
    mode: 'onSubmit'
  });

  useEffect(() => {
    setFocus('email');
  }, []);

  const onSubmit = (data: SignInFormData) => {
    handleClick(data);
  };

  return (
    <section className={cx('container')} ref={modalRef}>
      <h2 className={cx('title')}>{title}</h2>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
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
              required: 'Введите пароль',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов'
              }
            })}
          />
        </div>
        <Button className={cx('submit')} disabled={!isValid}>
          {buttonName}
        </Button>
      </form>
    </section>
  );
};
export default SignInForm;
