import DoctorNavTabs from '@/src/components/doctorPage/DoctorNavTabs/DoctorNavTabs';
import DoctorOverview from '@/src/components/doctorPage/DoctorOverview/DoctorOverview';
import Loader from '@/src/components/shared/Loader/Loader';
import { useLoading } from '@/src/hooks/useLoading';
import { DoctorsFullInfo } from '@/types';

import styles from './DoctorLayout.module.scss';

const DoctorLayout = ({
  children,
  pageProps
}: {
  children: React.ReactNode;
  pageProps: { doctor: DoctorsFullInfo };
}) => {
  const { doctor } = pageProps;
  const { loading } = useLoading(true);
  return (
    <div className={styles.container}>
      <DoctorOverview key={doctor.uid} overview {...doctor} />
      <DoctorNavTabs />
      {loading ? <Loader /> : children}
    </div>
  );
};

export default DoctorLayout;
