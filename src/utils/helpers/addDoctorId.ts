import { Qualification } from '@/types';

interface AddDoctorIdParams {
  array: Qualification[];
  uid: string;
}

export const addDoctorId = ({ array, uid }: AddDoctorIdParams) =>
  array.map((item) => ({ ...item, doctorId: uid }));
