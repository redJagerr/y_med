import { Doctors, Education, Expirience } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';

import DoctorLayout from '@/layouts/doctorPage/[doctorId]';
import DoctorInfo from '@/src/components/doctorPage/DoctorInfo/DoctorInfo';
import { getDoctor } from '@/src/utils/helpers/api/getDoctor';

interface DoctorInfoProps extends Doctors {
  expirience: Expirience[];
  education: Education[];
}
interface DoctorInfoPageProps {
  doctor: DoctorInfoProps;
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { doctorId },
  resolvedUrl
}) => {
  const props = await getDoctor({ doctorId: doctorId as string, resolvedUrl });
  return props;
};

export const DoctorInfoPage = ({ doctor }: DoctorInfoPageProps) => {
  const { speciality, education, expirience } = doctor;

  return <DoctorInfo education={education} expirience={expirience} speciality={speciality} />;
};

DoctorInfoPage.Layout = DoctorLayout;
export default DoctorInfoPage;
