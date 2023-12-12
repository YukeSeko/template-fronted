export type RoleType =  'ban' | 'admin' | 'user' | '';
export interface UserState {
  userAccount?: string;
  email?: string;
  id?: number;
  userName?:string;
  userAvatar?:string;
  userProfile?:string;
  userRole: RoleType;
  token:string;
}
