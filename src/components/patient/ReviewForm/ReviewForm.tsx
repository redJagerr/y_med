import { Input, Rate } from 'antd';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/UI/Button/Button';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';

import styles from './ReviewForm.module.scss';

export interface ReviewFormData {
  text: string;
  rating: number;
}
interface ReviewFormProps {
  handleOk: ({ text, rating }: ReviewFormData) => void;
  name: string;
  speciality: string;
  photo: string;
  time: Date;
}

const cx = bindStyles(styles);

const ReviewForm = ({ handleOk, name, speciality, photo, time }: ReviewFormProps) => {
  const { TextArea } = Input;
  const modalRef = useRef(null);
  const {
    handleSubmit,
    setFocus,
    control,
    formState: { errors, isValid }
  } = useForm<ReviewFormData>({
    mode: 'onSubmit'
  });

  useEffect(() => {
    setFocus('text');
  }, []);

  const onSubmit = ({ text, rating }: ReviewFormData) => {
    handleOk({ text, rating });
  };

  return (
    <section className={cx('container')} ref={modalRef}>
      <div className={cx('header')}>
        <div className={cx('photoContainer')}>
          <img className='image' src={photo} alt='' />
        </div>
        <span className={cx('name')}>{name}</span>
        <span className={cx('speciality')}>{speciality}</span>
        <span className={cx('appointmentDate')}>
          прием состоялся {getStringFromDate(new Date(time), 'full')}
        </span>
      </div>

      <form className={cx('form')} action='' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='rating'
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <>
              <Rate
                className={cx('rate')}
                defaultValue={0}
                value={field.value}
                onChange={(date) => {
                  field.onChange(date);
                }}
              />
              {fieldState.error ? <span className='error'>{fieldState.error?.message}</span> : null}
            </>
          )}
        />
        <Controller
          name='text'
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <>
              <TextArea
                autoSize
                placeholder='Напишите отзыв...'
                value={field.value}
                onChange={(date) => {
                  field.onChange(date);
                }}
              />
              {fieldState.error ? <span className='error'>{fieldState.error?.message}</span> : null}
            </>
          )}
        />

        {errors?.text && <span className='error'>{errors?.text?.message || 'Напишите отзыв'}</span>}
        {errors?.rating && (
          <span className='error'>{errors?.text?.message || 'Поставьте рейтинг'}</span>
        )}
        <Button className={cx('publish')} disabled={!isValid}>
          Опубликовать
        </Button>
      </form>
    </section>
  );
};
export default ReviewForm;
