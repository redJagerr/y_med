import DoctorSignUpForm from '@/src/components/admin/DoctorSignUpForm/DoctorSignUpForm';

import styles from './DoctorSignUpPage.module.scss';

const DoctorSignUpPage = () => (
  <section className={styles.container}>
    <DoctorSignUpForm />
  </section>
);

export default DoctorSignUpPage;
