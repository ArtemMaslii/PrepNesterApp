export interface UserDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  role: Role,
}

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum Role {
  GUEST = 'GUEST',
  CANDIDATE = 'CANDIDATE',
  ADMIN = 'ADMIN',
}