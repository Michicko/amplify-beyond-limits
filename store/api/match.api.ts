import { IGetAllMatchesResponse, IGetOneMatchDetails, IGetHomeData} from "@/types/auth";
import { api } from "@/store/slice/api.slice";
import { API_URL } from "@/config/constants";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createMatch: builder.mutation<IGetAllMatchesResponse, {}>({
      query: (data) => ({
        url: `${API_URL}/match/create`,
        method: "POST",
        body: data,
      }),
    }),
    getMatches: builder.query<IGetAllMatchesResponse, void>({
         query: () => `${API_URL}/match/get`,
         providesTags: ["Profile"],
      }),
    getOneMatche: builder.query<any, {id: string}>({
         query: ({id}) => `${API_URL}/match/${id}`,
         providesTags: ["Profile"],
    }),
    getOneMatchDetail: builder.mutation<IGetOneMatchDetails, {id: string}>({
         query: ({id}) => ({
          url: `${API_URL}/match/get-details?id=${id}`,
          method: "GET"
         })
    }),
    createMatchLineUp: builder.mutation<IGetAllMatchesResponse, {}>({
      query: (data) => ({
        url: `${API_URL}/match/line-up`,
        method: "POST",
        body: data,
      }),
    }),
    createMatchGoal: builder.mutation<IGetAllMatchesResponse, {}>({
      query: (data) => ({
        url: `${API_URL}/match/goal`,
        method: "POST",
        body: data,
      }),
    }),
     deleteMatchGoal: builder.mutation<IGetAllMatchesResponse, {id: string;}>({
      query: (data) => ({
        url: `${API_URL}/match/goal${data.id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    getHomeData: builder.query<IGetHomeData, void>({
         query: () => `${API_URL}/match/data`,
         providesTags: ["Profile"],
      }),
  }),
  overrideExisting: true,
});

export const 
{ 
  useCreateMatchMutation, 
  useGetMatchesQuery,
  useGetOneMatcheQuery,
  useGetOneMatchDetailMutation,
  useCreateMatchLineUpMutation,
  useCreateMatchGoalMutation,
  useDeleteMatchGoalMutation,
  useGetHomeDataQuery
} = authApiSlice;
