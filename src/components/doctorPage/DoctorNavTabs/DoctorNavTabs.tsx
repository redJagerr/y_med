import Link from 'next/link';
import { useRouter } from 'next/router';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './DoctorNavTabs.module.scss';

const tabs = [
  {
    link: 'info',
    title: 'О враче'
  },
  {
    link: 'appointment',
    title: 'Запись'
  },
  {
    link: 'reviews',
    title: 'Отзывы'
  }
];

const cx = bindStyles(styles);

const DoctorNavTabs = () => {
  const { query, asPath } = useRouter();
  const activeTab = asPath.split('/').pop();

  const renderTabs = () =>
    tabs.map(({ link, title }) => (
      <li key={title} className={cx({ active: link === activeTab })}>
        <Link className={cx('tab')} href={`/patient/appointments/${query.doctorId}/${link}`}>
          {title}
        </Link>
      </li>
    ));

  return <ul className={cx('tabs')}>{renderTabs()}</ul>;
};

export default DoctorNavTabs;
