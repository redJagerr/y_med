import {
  Appointments,
  Doctors,
  DoctorsSchedule,
  Education,
  Expirience,
  Reviews
} from '@prisma/client';

export interface WithKey {
  key: string;
}

export interface Qualification {
  year: string;
  title: string;
}

export interface DoctorsFullInfo extends Doctors {
  uid: string;
  schedule: DoctorsSchedule[];
  appointments: Appointments[];
  reviews: Reviews[];
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface DoctorInfo extends Doctors {
  expirience: Expirience[];
  education: Education[];
  schedule: DoctorsSchedule[];
}

export type QualificationType = 'expirience' | 'education';

export type UserType = 'patient' | 'doctor' | 'admin';

export type FormStatus = 'idle' | 'error' | 'loading' | 'success';

export type MedrecordType = 'appointment' | 'tests' | 'survey';

export type AppointmentStatusType = 'confirmed' | 'unconfirmed' | 'canceled' | 'completed';
