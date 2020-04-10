export class User {
  zipCode?: string;
  verified?: boolean;
  verificationImage?: string;
  school?: string;
  stories?: string[]; // List of names of stories
  latitude?: string[];
  longitude?: string[];
  role?: string;
  displayName?: string;
  profileImage?: string;
  email?: string;
  permissions?: {
    emailOptIn?: boolean;
  };
}
