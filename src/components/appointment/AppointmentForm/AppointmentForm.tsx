import { Doctors } from '@prisma/client';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/src/hooks/redux';
import { useError } from '@/src/hooks/useError';
import { useSuccess } from '@/src/hooks/useSuccess';
import { selectAuth } from '@/src/redux/selectors';
import { makeAnAppointment } from '@/src/utils/helpers/api/appointments';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';
import { FormStatus } from '@/types';

import SuccessMessage from '../../shared/SuccessMessage/SuccessMessage';
import Button from '../../UI/Button/Button';

import styles from './AppointmentForm.module.scss';

interface AppointmentFormProps {
  time: number;
  doctor: Doctors;
  handleCancel: () => void;
}

const cx = bindStyles(styles);

const AppointmentForm = ({ time, doctor, handleCancel }: AppointmentFormProps) => {
  const [speciality, setSpeciality] = useState(doctor.tags[0]);
  const [status, setStatus] = useState<FormStatus>('idle');

  const { user } = useAppSelector(selectAuth);
  const router = useRouter();
  const { name, phone, photoUrl, price, uid: doctorId, tags } = doctor;
  const appointmentTime = new Date(time);

  const preparedAppointment = {
    doctorId,
    patientId: user!.uid,
    time: appointmentTime,
    status: 'unconfirmed',
    speciality
  };

  const onSuccess = () => {
    handleCancel();
    setStatus('idle');
    router.push(router);
  };
  const onError = () => {
    setStatus('idle');
  };

  useSuccess({ status, onSuccess });
  useError({ status, onError });

  useEffect(() => {
    if (status !== 'error') return;
    const errorTimer = setTimeout(() => {}, 3000);
    return () => clearTimeout(errorTimer);
  }, [status]);

  const handleChange = (value: string) => {
    setSpeciality(value);
  };

  const handleSubmit = async () => {
    try {
      setStatus('loading');
      await makeAnAppointment(preparedAppointment, setStatus);
      setStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        setStatus('error');
      }
    }
  };

  const specialityObject = tags.map((specialityName) => ({
    value: specialityName,
    label: specialityName
  }));

  if (status === 'success') return <SuccessMessage />;

  return (
    <div className={cx('container')}>
      <div className={cx('infoContainer')}>
        <div className={cx('photo')}>
          <img className='image' src={photoUrl} alt='' />
        </div>
        <div className={cx('info')}>
          <span className={cx('name')}>{name}</span>
          <span>{`Стоимость: ${price}₽`}</span>
          <span>{`Дата приема: ${getStringFromDate(appointmentTime, 'full')}`}</span>
          <span>{`Номер для связи: ${phone}`}</span>
        </div>
      </div>
      <div className={cx('specialityContainer')}>
        <span className={cx('speciality')}>Cпециальность:</span>
        <Select defaultValue={tags[0]} options={specialityObject} onChange={handleChange} />
      </div>
      <Button onClick={handleSubmit}>
        {status === 'loading' ? 'Идет запись...' : 'Записаться'}
      </Button>
      {status === 'error' && <span className='error'>Ошибка при добавлении, повторите позже</span>}
    </div>
  );
};
export default AppointmentForm;
