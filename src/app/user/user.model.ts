export class User {
  public zipCode?: string;
  public verificationStatus?: 'verified' | 'flagged' | 'waiting verification' | 'rejected';
  public verificationImage?: string;
  public school?: string;
  public stories?: string[]; // List of names of stories
  public latitude?: string[];
  public longitude?: string[];
  public role?: string;
  public uid?: string;
  public displayName?: string;
  public profileImage?: string;
  public email?: string;
  public permissions?: {
    emailOptIn?: boolean;
  };
}
