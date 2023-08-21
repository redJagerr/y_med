import { Modal, Select } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import Button from '../../UI/Button/Button';
import MedRecordForm from '../MedRecordForm/MedRecordForm';

import styles from './MedcardHeader.module.scss';

interface MedcardHeaderProps {
  doctor?: boolean;
}

const cx = bindStyles(styles);

const MedcardHeader = ({ doctor }: MedcardHeaderProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (value: string) => {
    router.query.sort = value;
    router.push(router);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={cx('container')}>
        <h2>Медкарта</h2>
        <div className={cx('selectContainer')}>
          <span>Сортировать</span>
          <Select
            defaultValue='all'
            className={cx('select')}
            onChange={handleChange}
            options={[
              { value: 'all', label: 'Все документы' },
              { value: 'tests', label: 'Анализы' },
              { value: 'appointment', label: 'Прием' },
              { value: 'survey', label: 'Обследование' }
            ]}
          />
        </div>
      </div>
      {!doctor && (
        <Button className={cx('add')} onClick={showModal}>
          Добавить
        </Button>
      )}
      <Modal
        title='Запись на прием'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <MedRecordForm closeModal={handleCancel} />
      </Modal>
    </>
  );
};

export default MedcardHeader;
