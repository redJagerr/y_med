import { Medcard_Record } from '@prisma/client';
import { GetServerSideProps } from 'next';

import MedcardHeader from '@/src/components/medcard/MedcardHeader/MedcardHeader';
import MedcardList from '@/src/components/medcard/MedcardList/MedcardList';
import NoItemsMessage from '@/src/components/shared/NoItemsMessage/NoItemsMessage';
import { getAccessStatus } from '@/src/utils/helpers/api/access';
import { getUidFromToken } from '@/src/utils/helpers/api/getUidFromToken';
import { getMedcardRecord } from '@/src/utils/helpers/api/medRecord';
import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './DoctorMedcardPage.module.scss';

interface DoctorMedcardPageProps {
  medcardRecords: Medcard_Record[];
  isAccess: boolean;
}

const cx = bindStyles(styles);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const uid = await getUidFromToken(ctx);
    const { patientId, sort } = ctx.query;
    const isAccess = await getAccessStatus({ patientId: patientId as string, uid });
    const medcardRecords = await getMedcardRecord({
      uid: patientId as string,
      sort: sort as string
    });
    return { props: { medcardRecords, isAccess } };
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return { props: {} as never };
  }
};

const DoctorMedcardPage = ({ medcardRecords, isAccess }: DoctorMedcardPageProps) => {
  if (!isAccess)
    return (
      <NoItemsMessage className={cx('accessMessage')}>
        Пациент не дал вам доступ к своей медкарте
      </NoItemsMessage>
    );
  return (
    <section className={cx('container')}>
      <MedcardHeader doctor />
      <MedcardList records={medcardRecords} />
    </section>
  );
};

export default DoctorMedcardPage;
