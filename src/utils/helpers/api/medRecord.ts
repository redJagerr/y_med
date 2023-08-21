import { Medcard_Record } from '@prisma/client';
import axios from 'axios';
import { deleteObject, ref } from 'firebase/storage';

import { storage } from '@/@firebase';

interface GetMedcardRecordParams {
  uid: string;
  sort: string;
}

export const getMedcardRecord = async ({ uid, sort }: GetMedcardRecordParams) => {
  const { data } = await axios(
    `https://your-med.onrender.com/api/medRecord?uid=${uid}&&sort=${sort}`
  );
  return data;
};

export const deleteMedcardRecord = async (id: string) => {
  const result = await axios.delete(`https://your-med.onrender.com/api/medRecord?id=${id}`);
  return result.data;
};

export const deleteMedrecordImages = async (photos: string[]) => {
  photos.forEach(async (photoURL) => {
    const imageRef = ref(storage, photoURL);
    await deleteObject(imageRef);
  });
};
export const addMedrecord = async (data: Medcard_Record) => {
  await axios.post('https://your-med.onrender.com/api/medRecord', data);
};
