import { Modal } from 'antd';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AppointmentStatus from '@/components/appointment/AppointmentStatus/AppointmentStatus';
import Button from '@/components/UI/Button/Button';
import { AppointmentsWithDoctor } from '@/pages/patient';
import { changeAppointmentStatus } from '@/src/utils/helpers/api/appointments';
import { addReview } from '@/src/utils/helpers/api/reviews';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';
import { AppointmentStatusType, WithKey } from '@/types';

import ConfirmAccessModal from '../ConfirmAccessModal/ConfirmAccessModal';
import ReviewForm, { ReviewFormData } from '../ReviewForm/ReviewForm';

import styles from './PatientAppointment.module.scss';

interface PatientAppointmentProps extends WithKey {
  appointment: AppointmentsWithDoctor;
  isReviewedDoctor?: boolean;
}

const cx = bindStyles(styles);

const PatientAppointment = ({ appointment, isReviewedDoctor }: PatientAppointmentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { id, patientId, doctorId, time, doctor, status, speciality } = appointment;
  const { name, photoUrl } = doctor;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkReview = async ({ text, rating }: ReviewFormData) => {
    const data = {
      doctorId,
      patientId,
      text,
      rating,
      date: time
    };
    await addReview(data);
    router.push(router);
    setIsModalOpen(false);
  };

  const redirectMakeNewAppointment = () =>
    router.push(`/patient/appointments/${doctorId}/appointment`);

  const buttonTypesMap = {
    confirmed: {
      additionalType: 'cancel',
      mainTitle: '',
      additionalTitle: 'Отменить',
      handleMain: () => {},
      handleAdditional: () => changeAppointmentStatus(router, id, 'canceled')
    },
    unconfirmed: {
      additionalType: 'cancel',
      mainTitle: '',
      additionalTitle: 'Отменить',
      handleMain: () => {},
      handleAdditional: () => changeAppointmentStatus(router, id, 'canceled')
    },
    completed: {
      additionalType: 'review',
      mainTitle: 'Записаться повторно',
      additionalTitle: 'Оставить отзыв',
      handleMain: redirectMakeNewAppointment,
      handleAdditional: () => {
        showModal();
      }
    },
    canceled: {
      additionalType: 'findDoctor',
      additionalTitle: 'Найти врача',
      mainTitle: 'Записаться повторно',
      handleMain: redirectMakeNewAppointment,
      handleAdditional: () => {
        router.push(`/${patientId}/appointment`);
      }
    }
  };

  const date = getStringFromDate(time, 'full');

  const { additionalTitle, mainTitle, handleMain, handleAdditional, additionalType } =
    buttonTypesMap[status as AppointmentStatusType];

  const isAdditionalCancel = additionalType === 'cancel';

  const isAdditionalFindDoctor = additionalType === 'findDoctor';

  const isAdditionalButtonHidden =
    isReviewedDoctor && !isAdditionalCancel && !isAdditionalFindDoctor;

  return (
    <>
      <li className={cx('appointment')}>
        <div className={cx('header')}>
          <AppointmentStatus status={status as AppointmentStatusType} />
          <span className={cx('date')}>{date}</span>
        </div>
        <div className={cx('main')}>
          <div className={cx('photo')}>
            <img className='image' src={photoUrl} alt={`Фото врача ${name}`} />
          </div>
          <div className={cx('info')}>
            <span className={cx('name')}>{name}</span>
            <span className={cx('speciality')}>{speciality}</span>
          </div>
          {status === 'confirmed' && (
            <ConfirmAccessModal doctorId={doctorId} patientId={patientId} />
          )}
        </div>
        <div className={cx('buttons')}>
          {mainTitle && (
            <Button size='small' onClick={handleMain}>
              {mainTitle}
            </Button>
          )}
          <Button
            className={cn(
              { hidden: isAdditionalButtonHidden },
              cx({ cancelButton: isAdditionalCancel })
            )}
            onClick={handleAdditional}
            type={isAdditionalFindDoctor ? 'link' : 'outline'}
            size='small'
          >
            {additionalTitle}
          </Button>
        </div>
      </li>
      <Modal title='Отзыв' open={isModalOpen} onCancel={handleCancel} footer={false}>
        <ReviewForm
          name={name}
          speciality={speciality}
          photo={photoUrl}
          time={time}
          handleOk={handleOkReview}
        />
      </Modal>
    </>
  );
};

export default PatientAppointment;
