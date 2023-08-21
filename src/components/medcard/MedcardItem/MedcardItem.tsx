import { Medcard_Record } from '@prisma/client';
import { Drawer, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiFlaskFill, RiStethoscopeLine, RiSurveyFill } from 'react-icons/ri';

import { deleteMedcardRecord, deleteMedrecordImages } from '@/src/utils/helpers/api/medRecord';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { getStringFromDate } from '@/src/utils/helpers/getStringFromDate';
import { MedrecordType, WithKey } from '@/types';

import Button from '../../UI/Button/Button';
import MedRecordPhoto from '../MedRecordPhoto/MedRecordPhoto';

import styles from './MedcardItem.module.scss';

interface MedcardItemProps
  extends Omit<Medcard_Record, 'patientId' | 'doctorId' | 'doctorComment'>,
    WithKey {
  type: MedrecordType;
}

const cx = bindStyles(styles);

const medRecordTypeMap = {
  appointment: {
    recordTitle: 'Прием',
    icon: <RiStethoscopeLine className={cx('tagIcon', 'tagIconAppointment')} />
  },
  tests: {
    recordTitle: 'Анализы',
    icon: <RiFlaskFill className={cx('tagIcon', 'tagIconTests')} />
  },
  survey: {
    recordTitle: 'Обследование',
    icon: <RiSurveyFill className={cx('tagIcon', 'tagIconSurvey')} />
  }
};

const MedcardItem = ({ id, title, subtitle, date, type, photos }: MedcardItemProps) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalPhoto, setCurrentModalPhoto] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (currentModalPhoto) showModal();
  }, [currentModalPhoto]);

  const cancleModal = () => {
    setIsModalOpen(false);
  };
  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleDelete = async () => {
    await deleteMedcardRecord(id);
    await deleteMedrecordImages(photos);
    router.push(router);
  };

  const checkPhoto = (photo: string) =>
    photo === currentModalPhoto ? showModal() : setCurrentModalPhoto(photo);

  const { recordTitle, icon } = medRecordTypeMap[type];

  const renderPhotos = () =>
    photos.map((photo: string) => (
      <MedRecordPhoto photo={photo} onClick={() => checkPhoto(photo)} />
    ));

  const tagColor = `typeTag${type.slice(0, 1).toUpperCase() + type.slice(1)}`;

  return (
    <li className={cx('container')}>
      <div className={cx('header')}>
        <span className={cx(tagColor, 'typeTag')}>{recordTitle}</span>{' '}
        <span className={cx('date')}>{getStringFromDate(new Date(date), 'short')}</span>
      </div>
      <div className={cx('mainContainer')}>
        <div className={cx('iconContainer')}>{icon}</div>
        <div className={cx('info')}>
          <span className={cx('subtitle')}>{subtitle}</span>
          <span className={cx('title')}>{title}</span>
        </div>
      </div>
      <div className='flex gap-4 text-white'>
        <Button className={cx('open')} size='small' onClick={showDrawer}>
          Открыть запись
        </Button>
        <Button className={cx('delete')} size='small' onClick={handleDelete}>
          Удалить
        </Button>
      </div>
      <Drawer title={title} placement='right' onClose={closeDrawer} open={drawerOpen}>
        <div className={cx('photosContainer')}>{renderPhotos()}</div>
      </Drawer>
      <Modal
        className='h-3/4 w-full'
        title='Фото'
        open={isModalOpen}
        footer={false}
        onCancel={cancleModal}
      >
        <img className='image' src={currentModalPhoto} alt='' />
      </Modal>
    </li>
  );
};

export default MedcardItem;
