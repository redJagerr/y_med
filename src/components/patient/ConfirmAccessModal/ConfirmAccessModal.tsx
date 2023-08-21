import { Modal, Select } from 'antd';
import { useState } from 'react';
import { FaUnlockAlt } from 'react-icons/fa';

import SuccessMessage from '@/components/shared/SuccessMessage/SuccessMessage';
import Button from '@/components/UI/Button/Button';
import { useError } from '@/src/hooks/useError';
import { useSuccess } from '@/src/hooks/useSuccess';
import { giveAccess } from '@/src/utils/helpers/api/access';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { FormStatus } from '@/types';

import styles from './ConfirmAccessModal.module.scss';

const selectOptions = [
  {
    value: 1,
    label: 1
  },
  {
    value: 2,
    label: 2
  },
  {
    value: 3,
    label: 3
  }
];

const cx = bindStyles(styles);

const ConfirmAccessModal = ({ doctorId, patientId }: { [key: string]: string }) => {
  const [durationDays, setDurationDays] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (value: number) => {
    setDurationDays(value);
  };

  const handleSubmit = async () => {
    try {
      setStatus('loading');
      const { data } = await giveAccess({ doctorId, patientId, durationDays });
      if (data.error) throw Error(data.error);
      setStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        setStatus('error');
        setErrorMessage(error.message);
      }
    }
  };

  const onSuccess = () => {
    setStatus('idle');
    handleCancel();
  };

  const onError = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  useSuccess({ status, onSuccess });
  useError({ status, onError });

  return (
    <>
      <Button className={cx('unlock')} onClick={showModal}>
        <FaUnlockAlt size={20} color='inherit' />
      </Button>
      <Modal
        title='Дать доступ'
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        {status === 'success' ? (
          <SuccessMessage />
        ) : (
          <div className={cx('container')}>
            <div className={cx('info')}>
              <span>На сколько дней?</span>
              <Select onChange={handleSelect} options={selectOptions} defaultValue={durationDays} />
            </div>
            <Button className={cx('accept')} onClick={handleSubmit}>
              {status === 'loading' ? 'Обрабатываем...' : 'Подтвердить'}
            </Button>
            {errorMessage && <span className='error'>{errorMessage}</span>}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ConfirmAccessModal;
