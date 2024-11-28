import { IGetAllTeamsResponse, ITeam} from "@/types/auth";
import { api } from "@/store/slice/api.slice";
import { API_URL } from "@/config/constants";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation<IGetAllTeamsResponse, ITeam>({
      query: (data) => ({
        url: `${API_URL}/team/create`,
        method: "POST",
        body: data,
      }),
    }),
    updateTeam: builder.mutation<IGetAllTeamsResponse, ITeam>({
      query: (data) => ({
        url: `${API_URL}/team/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getTeams: builder.query<IGetAllTeamsResponse, void>({
         query: () => `${API_URL}/team/get`,
         providesTags: ["Profile"],
      }),
    getOneTeam: builder.query<any, {id: string}>({
         query: ({id}) => `${API_URL}/team/${id}`,
         providesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateTeamMutation, useGetTeamsQuery, useGetOneTeamQuery, useUpdateTeamMutation } = authApiSlice;
