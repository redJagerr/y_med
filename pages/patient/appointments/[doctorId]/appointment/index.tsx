import { Appointments, Doctors, DoctorsSchedule } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';

import DoctorLayout from '@/layouts/doctorPage/[doctorId]';
import AppointmentTime from '@/src/components/appointment/AppointmentTime/AppointmentTime';
import { getDoctor } from '@/src/utils/helpers/api/getDoctor';

interface DoctorwithSheduleAndAppointments extends Doctors {
  appointments: Appointments[];
  schedule: DoctorsSchedule[];
}
interface DoctorAppointmentPageProps {
  doctor: DoctorwithSheduleAndAppointments;
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { doctorId },
  resolvedUrl
}) => {
  const props = await getDoctor({ doctorId: doctorId as string, resolvedUrl });
  return props;
};

const DoctorAppointment = ({ doctor }: DoctorAppointmentPageProps) => {
  const { schedule, appointments, ...doctorFormInfo } = doctor;

  return (
    <AppointmentTime doctor={doctorFormInfo} schedule={schedule} appointments={appointments} full />
  );
};

DoctorAppointment.Layout = DoctorLayout;
export default DoctorAppointment;
