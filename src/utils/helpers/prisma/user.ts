import { Patient } from '@prisma/client';

import prisma from '@/src/lib/prisma';
import { DoctorInfo, UserType } from '@/types';

export const getUser = async (uid: string, type: UserType) => {
  if (type === 'patient') {
    const user = await prisma.patient.findUnique({
      where: {
        uid
      }
    });
    return user;
  }
  if (type === 'doctor') {
    const user = await prisma.doctors.findUnique({
      where: {
        uid
      },
      include: {
        schedule: true,
        appointments: true
      }
    });

    return user;
  }
};
export const addUser = async (type: UserType, body: Patient | DoctorInfo) => {
  if (type === 'patient') {
    const result = await prisma.patient.create({
      data: {
        ...(body as Patient)
      }
    });
    return result;
  }
  if (type === 'doctor' && body) {
    const { education, schedule, expirience, ...doctor } = body as DoctorInfo;
    const doctorResult = await prisma.doctors.create({
      data: {
        ...doctor
      }
    });
    const educationResult = await prisma.education.createMany({
      data: education
    });
    const expirienceResult = await prisma.expirience.createMany({
      data: expirience
    });
    const scheduleResult = await prisma.doctorsSchedule.createMany({
      data: schedule
    });
    return { doctorResult, educationResult, expirienceResult, scheduleResult };
  }
};
