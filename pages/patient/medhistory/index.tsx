import { Medcard_Record } from '@prisma/client';
import { GetServerSideProps } from 'next';

import MedcardHeader from '@/src/components/medcard/MedcardHeader/MedcardHeader';
import MedcardList from '@/src/components/medcard/MedcardList/MedcardList';
import { getUidFromToken } from '@/src/utils/helpers/api/getUidFromToken';
import { getMedcardRecord } from '@/src/utils/helpers/api/medRecord';

import styles from './MedhistoryPage.module.scss';

interface MedhistoryPageProps {
  medcardRecords: Medcard_Record[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const uid = await getUidFromToken(ctx);

    const { sort } = ctx.query;
    const medcardRecords = await getMedcardRecord({ uid, sort: sort as string });
    return { props: { medcardRecords } };
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return { props: {} as never };
  }
};

const MedhistoryPage = ({ medcardRecords }: MedhistoryPageProps) => (
  <section className={styles.container}>
    <MedcardHeader />
    <MedcardList records={medcardRecords} />
  </section>
);

export default MedhistoryPage;
