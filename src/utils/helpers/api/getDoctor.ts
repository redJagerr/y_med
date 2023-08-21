import axios from 'axios';

interface GetDoctorParams {
  doctorId: string;
  resolvedUrl?: string;
  type?: string;
}

export const getDoctor = async ({ doctorId, resolvedUrl, type }: GetDoctorParams) => {
  const pageName = resolvedUrl ? resolvedUrl.split('/').pop() : type;
  const doctor = await axios(
    `https://your-med.onrender.com/api/getDoctor?uid=${doctorId}&type=${pageName}`
  );
  return { props: { doctor: { ...doctor.data } } };
};
