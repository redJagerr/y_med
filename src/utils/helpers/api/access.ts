import { Medcard_Access } from '@prisma/client';
import axios from 'axios';
import dayjs from 'dayjs';

interface GetAccessStatusParams {
  patientId: string;
  uid: string;
}

interface GiveAccessParams {
  patientId: string;
  doctorId: string;
  durationDays: number;
}

export const getAccessStatus = async ({ patientId, uid }: GetAccessStatusParams) => {
  const { data } = await axios(
    `https://your-med.onrender.com/api/access?patientId=${patientId}&&doctorId=${uid}`
  );
  return data.isAccess;
};

export const giveAccess = async ({ patientId, doctorId, durationDays }: GiveAccessParams) => {
  const accessData: Omit<Medcard_Access, 'id'> = {
    patientId,
    doctorId,
    deadline: new Date(dayjs().add(durationDays, 'day').valueOf())
  };
  const result = await axios.post('https://your-med.onrender.com/api/access', accessData);
  return result;
};
