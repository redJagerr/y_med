import { Appointments } from '@prisma/client';
import axios from 'axios';
import { NextRouter } from 'next/router';

import { DoctorAppointmentsForAdmin } from '@/pages/admin';
import { AppointmentStatusType, FormStatus } from '@/types';

interface GetPatientAppointmentsParams {
  uid: string;
  page: string;
}

interface GetDoctorAppointmentsProps {
  uid: string;
  date: string;
}

export const getPatientAppointments = async ({ uid, page }: GetPatientAppointmentsParams) => {
  const appointments = await axios(
    `https://ymed-4j4e.onrender.com/api/appointments?type=${'patient'}&uid=${uid}&page=${page}`
  );
  return appointments.data;
};

export const getAdminAppointment = async (): Promise<DoctorAppointmentsForAdmin> => {
  const appointments = await axios('https://ymed-4j4e.onrender.com/api/adminAppointments');
  return appointments.data;
};

export const getDoctorAppointments = async ({ uid, date }: GetDoctorAppointmentsProps) => {
  const appointments = await axios(
    `https://ymed-4j4e.onrender.com/api/doctorAppointments?uid=${uid}&date=${date}`
  );
  return appointments.data;
};

export const changeAppointmentStatus = async (
  router: NextRouter,
  id: number,
  status: AppointmentStatusType
) => {
  try {
    await axios.put(`https://ymed-4j4e.onrender.com/api/appointments?id=${id}`, {
      status
    });
    router.replace(router.asPath);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

export const makeAnAppointment = async (
  preparedAppointment: Omit<Appointments, 'id'>,
  changeStatusState: (status: FormStatus) => void
) => {
  try {
    await axios.post('https://ymed-4j4e.onrender.com/api/appointments', preparedAppointment);
    changeStatusState('success');
  } catch (error) {
    if (error instanceof Error) console.log(error);
  }
};
