import { Medcard_Record } from '@prisma/client';

import NoItemsMessage from '@/components/shared/NoItemsMessage/NoItemsMessage';
import { bindStyles } from '@/src/utils/helpers/bindStyles';
import { MedrecordType } from '@/types';

import MedcardItem from '../MedcardItem/MedcardItem';

import styles from './MedcardList.module.scss';

const cx = bindStyles(styles);

const MedcardList = ({ records }: { records: Medcard_Record[] }) => {
  const renderMedcardItem = () =>
    records.map(({ id, date, title, subtitle, type, photos }) => (
      <MedcardItem
        date={date}
        type={type as MedrecordType}
        id={id}
        title={title}
        subtitle={subtitle}
        photos={photos}
        key={id + date}
      />
    ));
  const isMedcardItems = records.length === 0;

  return isMedcardItems ? (
    <NoItemsMessage className={cx('noRecordsTitle')}>Записей в медкарте нет</NoItemsMessage>
  ) : (
    <ul className={cx('list')}>{renderMedcardItem()}</ul>
  );
};

export default MedcardList;
