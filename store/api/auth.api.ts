import { ILoginUserRequest, ILoginUserResponse } from "@/types/auth";
import { api } from "@/store/slice/api.slice";
import { encryptReqBody } from "@/helpers/encryption";
import { API_URL } from "@/config/constants";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginUserResponse, ILoginUserRequest>({
      query: (data) => ({
        url: `${API_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    updatePassword: builder.mutation<ILoginUserResponse, object>({
      query: (data) => ({
        url: `${API_URL}/auth/update-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    getUsers: builder.query<any, void>({
         query: () => `${API_URL}/auth/user`,
         providesTags: ["Profile"],
      }),
  }),
  overrideExisting: true,
});

export const { useLoginUserMutation, useUpdatePasswordMutation, useGetUsersQuery } = authApiSlice;
