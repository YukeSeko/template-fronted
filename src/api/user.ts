import axios from 'axios';
import { UserState } from '@/store/modules/user/types';
import request from "@/api/interceptor";

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return request.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return request.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return request.post<UserState>('/api/user/getLoginUser');
}
