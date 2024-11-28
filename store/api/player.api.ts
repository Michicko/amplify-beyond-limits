import { IGetAllPlayerResponse, IPlayer} from "@/types/auth";
import { api } from "@/store/slice/api.slice";
import { API_URL } from "@/config/constants";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createPlayer: builder.mutation<IGetAllPlayerResponse, IPlayer>({
      query: (data) => ({
        url: `${API_URL}/player/create`,
        method: "POST",
        body: data,
      }),
    }),
    updatePlayer: builder.mutation<IGetAllPlayerResponse, IPlayer>({
      query: (data) => ({
        url: `${API_URL}/player/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getPlayer: builder.query<IGetAllPlayerResponse, void>({
         query: () => `${API_URL}/player/get`,
         providesTags: ["Profile"],
      }),
    getOnePlayer: builder.query<any, {id: string}>({
         query: ({id}) => `${API_URL}/player/${id}`,
         providesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePlayerMutation, useGetOnePlayerQuery, useGetPlayerQuery, useUpdatePlayerMutation } = authApiSlice;
