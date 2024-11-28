import { IUser } from "@/types/user";
export type IUserType = "admin";


export interface IUser {
  _id?: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  token?: string;
  role: IUserType;
  viewer_type?: string;
  zone_id?: string;
  tpay_wallet_id?: string;
  createdAt?: string;
  updatedAt?: string;
  account_active?: boolean;
  enforcer_type?: string;
  zone_id?: string;
  bank_id?: string;
  revenue_head_id?: string;
}

export interface IZone {
  zone_code?: string;
  zone_name?: string;
  revenue_head_id?: string;
};
