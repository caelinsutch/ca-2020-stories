export class User {
  zipCode?: string;
  verificationStatus?: string;
  verificationImage?: string;
  school?: string;
  stories?: string[]; // List of names of stories
  latitude?: string[];
  longitude?: string[];
  role?: string;
  uid?: string;
  displayName?: string;
  profileImage?: string;
  email?: string;
  permissions?: {
    emailOptIn?: boolean;
  };
}
