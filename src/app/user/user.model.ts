export interface User {
  zipCode?: string;
  verificationStatus?: 'verified' | 'flagged' | 'waiting verification' | 'rejected';
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
