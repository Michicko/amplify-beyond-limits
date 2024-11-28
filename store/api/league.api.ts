import { IGetAllLeagueResponse, ILeague} from "@/types/auth";
import { api } from "@/store/slice/api.slice";
import { API_URL } from "@/config/constants";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createLeague: builder.mutation<IGetAllLeagueResponse, ILeague>({
      query: (data) => ({
        url: `${API_URL}/league/create`,
        method: "POST",
        body: data,
      }),
    }),
    updateLeague: builder.mutation<IGetAllLeagueResponse, ILeague>({
      query: (data) => ({
        url: `${API_URL}/league/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getLeague: builder.query<IGetAllLeagueResponse, void>({
         query: () => `${API_URL}/league/get`,
         providesTags: ["Profile"],
      }),
    getOneLeague: builder.query<any, {id: string}>({
         query: ({id}) => `${API_URL}/league/${id}`,
         providesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateLeagueMutation, useGetLeagueQuery, useGetOneLeagueQuery, useUpdateLeagueMutation } = authApiSlice;
