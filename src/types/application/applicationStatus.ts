import {
  APPLICATION_STATUS_TYPE,
  KO_APPLICATION_STATUS_TYPE,
} from '@/constants/application';

export type ApplicationStatusType =
  (typeof APPLICATION_STATUS_TYPE)[keyof typeof APPLICATION_STATUS_TYPE];

export type KoApplicationStatusType =
  (typeof KO_APPLICATION_STATUS_TYPE)[keyof typeof KO_APPLICATION_STATUS_TYPE];
