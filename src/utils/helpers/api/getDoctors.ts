import axios from 'axios';

interface GetDoctorsProps {
  page: string;
  sort: string;
  speciality?: string;
}

export const getDoctors = async ({ page, sort, speciality }: GetDoctorsProps) => {
  const specialityQuery = speciality ? `&speciality=${speciality}` : '';
  const result = await axios(
    `https://your-med.onrender.com/api/getDoctors?page=${page}&sort=${sort}${specialityQuery}`
  );
  return result.data;
};
