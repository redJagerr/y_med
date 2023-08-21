import { Medcard_Record } from '@prisma/client';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { HiOutlineCalendar } from 'react-icons/hi';
import { MdOutlineSubtitles, MdTextFormat } from 'react-icons/md';
import { v4 as uuid } from 'uuid';

import { useAppSelector } from '@/src/hooks/redux';
import { useError } from '@/src/hooks/useError';
import { useSuccess } from '@/src/hooks/useSuccess';
import { selectAuth } from '@/src/redux/selectors';
import { uploadImagesArray } from '@/src/utils/helpers/api/images';
import { addMedrecord } from '@/src/utils/helpers/api/medRecord';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { FileWithPreview, FormStatus } from '@/types';

import Dropzone from '../../shared/Dropzone/Dropzone';
import SelectedImagePreviewItem from '../../shared/SelectedImagePreviewItem/SelectedImagePreviewItem';
import SuccessMessage from '../../shared/SuccessMessage/SuccessMessage';
import Button from '../../UI/Button/Button';

import styles from './MedRecordForm.module.scss';

interface MedRecordFormProps {
  closeModal: () => void;
  title?: string;
  subtitle?: string;
  date?: dayjs.Dayjs;
}
interface HandleAuthParams {
  title: string;
  subtitle: string;
  date: number;
  type: string;
}

const recordTypeOptions = [
  {
    value: 'appointment',
    label: 'Прием'
  },
  {
    value: 'tests',
    label: 'Анализы'
  },
  {
    value: 'survey',
    label: 'Обследование'
  }
];

const cx = bindStyles(styles);

const MedRecordForm = ({
  closeModal,
  title = '',
  subtitle = '',
  date = dayjs()
}: MedRecordFormProps) => {
  const [selectedImages, setSelectedImages] = useState<FileWithPreview[]>([]);
  const [status, setStatus] = useState<FormStatus>('idle');
  const modalRef = useRef(null);
  const router = useRouter();
  const { user } = useAppSelector(selectAuth);

  const {
    reset,
    register,
    handleSubmit,
    setFocus,
    control,
    formState: { isValid }
  } = useForm<HandleAuthParams>({
    mode: 'onSubmit'
  });

  useEffect(() => {
    setFocus('title');
  }, []);

  const onSuccess = () => {
    reset();
    setStatus('idle');
    closeModal();
    router.push(router);
  };
  const onError = () => setStatus('idle');

  useSuccess({ status, onSuccess });
  useError({ status, onError });

  const removeImage = (imageName: string) => {
    setSelectedImages(selectedImages.filter((file) => file.name !== imageName));
  };

  const onSubmit = async (data: HandleAuthParams) => {
    try {
      setStatus('loading');
      const medrecordId = uuid();
      const imagesArray = await uploadImagesArray({
        selectedImages,
        urlPath: `${user!.uid}/${medrecordId}`
      });

      setSelectedImages([]);

      const preparedData: Medcard_Record = {
        ...data,
        id: medrecordId,
        date: new Date(data.date),
        photos: imagesArray,
        patientId: user!.uid
      };
      await addMedrecord(preparedData);
      setStatus('success');
    } catch (error) {
      if (error instanceof Error) setStatus('error');
    }
  };

  const imagesPreviews = selectedImages?.map((file) => (
    <SelectedImagePreviewItem preview={file.preview} onClick={() => removeImage(file.name)} />
  ));

  if (status === 'success') return <SuccessMessage />;

  return (
    <div className={cx('container')} ref={modalRef}>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
        <div className='inputWrapper'>
          <MdTextFormat size={24} />
          <input
            className='input'
            type='text'
            placeholder='Название записи'
            defaultValue={title}
            {...register('title')}
          />
        </div>
        <div className='inputWrapper'>
          <FaHandHoldingMedical size={24} />
          <input
            className='input'
            type='text'
            placeholder='Имя доктора или записи'
            defaultValue={subtitle}
            {...register('subtitle')}
          />
        </div>
        <div className='inputWrapper'>
          <HiOutlineCalendar size={24} />
          <Controller
            name='date'
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <DatePicker
                  placeholder='Дата записи'
                  defaultValue={date}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(currentDate) => {
                    field.onChange(currentDate ? currentDate.valueOf() : null);
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
          <MdOutlineSubtitles size={24} />
          <Controller
            name='type'
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  placeholder='Тип записи'
                  optionFilterProp='children'
                  value={field.value}
                  onChange={(recordType) => {
                    field.onChange(recordType ? recordType.valueOf() : null);
                  }}
                  options={recordTypeOptions}
                />
                {fieldState.error ? (
                  <span className='error'>{fieldState.error?.message}</span>
                ) : null}
              </>
            )}
          />
        </div>
        <Dropzone setSelectedImages={setSelectedImages} />
        <div className={cx('imagesContainer')}>{imagesPreviews}</div>
        <Button className={cx('add')} disabled={!isValid}>
          {status === 'loading' ? 'Добавляем...' : 'Добавить'}
        </Button>
      </form>
      {status === 'error' && <span className='error'>Ошибка при добавлении, повторите позже</span>}
    </div>
  );
};
export default MedRecordForm;
