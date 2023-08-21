import axios from 'axios';

interface GetDoctorsProps {
  page: string;
  sort: string;
  speciality?: string;
}

export const getDoctors = async ({ page, sort, speciality }: GetDoctorsProps) => {
  const specialityQuery = speciality ? `&speciality=${speciality}` : '';
  const result = await axios(
    `https://ymed-4j4e.onrender.com/api/getDoctors?page=${page}&sort=${sort}${specialityQuery}`
  );
  return result.data;
};
