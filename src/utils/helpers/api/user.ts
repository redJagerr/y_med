import { Doctors, DoctorsSchedule, Patient } from '@prisma/client';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SetStateAction } from 'react';

import { auth } from '@/@firebase';
import { FileWithPreview, FormStatus, Qualification } from '@/types';

import { addDoctorId } from '../addDoctorId';

import { uploadImage } from './images';

interface ScheduleNoIds extends Omit<DoctorsSchedule, 'doctorId' | 'id'> {
  doctorId?: string;
}
interface SignUpDoctorData extends Omit<Doctors, 'uid' | 'photoUrl'> {
  email: string;
  password: string;
  photoFile: FileWithPreview;
  education: Qualification[];
  expirience: Qualification[];
  schedule: ScheduleNoIds;
}
interface SignUpDoctorParams {
  data: SignUpDoctorData;
  setStatus: React.Dispatch<SetStateAction<FormStatus>>;
}

export const getUser = async ({ uid, type }: { [key: string]: string }) => {
  const { data }: { data: Patient | Doctors } = await axios(
    `https://your-med.onrender.com/api/user?uid=${uid}&type=${type}`
  );
  return data;
};

export const addPatient = async (userDataBody: Patient) => {
  const result = await axios.post(`https://your-med.onrender.com/api/user?type=patient`, {
    ...userDataBody
  });
  return result;
};

export const signUpDoctor = ({ data, setStatus }: SignUpDoctorParams) => {
  const { email, password, photoFile, ...postData } = data;
  const { education: dataEducation, expirience: dataExpirience } = postData;
  setStatus('loading');
  createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user: { uid } }) => {
      const photoUrl = await uploadImage({ urlPath: uid, image: photoFile });
      const expirienceWithId = addDoctorId({ array: dataEducation, uid });
      const edicationWithId = addDoctorId({ array: dataExpirience, uid });
      const finalData = {
        ...postData,
        education: edicationWithId,
        expirience: expirienceWithId,
        uid,
        photoUrl
      };
      finalData.schedule.doctorId = uid;
      await axios.post(`https://your-med.onrender.com/api/user?type=doctor`, finalData);
      setStatus('success');
    })
    .catch((error) => {
      setStatus(error);
      console.log(error);
    });
};
