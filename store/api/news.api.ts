import { IGetAllNewsResponse, INews, IGetOneNewsResponse} from "@/types/auth";
import { api } from "@/store/slice/api.slice";
import { API_URL } from "@/config/constants";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createNews: builder.mutation<IGetAllNewsResponse, INews>({
      query: (data) => ({
        url: `${API_URL}/news/create`,
        method: "POST",
        body: data,
      }),
    }),
    updateNews: builder.mutation<IGetAllNewsResponse, INews>({
      query: (data) => ({
        url: `${API_URL}/news/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getNews: builder.query<IGetAllNewsResponse, void>({
         query: () => `${API_URL}/news/get`,
         providesTags: ["Profile"],
      }),
    getOneNews: builder.query<IGetOneNewsResponse, {id: string}>({
         query: ({id}) => `${API_URL}/news/get/${id}`,
         providesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateNewsMutation, useGetOneNewsQuery, useGetNewsQuery, useUpdateNewsMutation } = authApiSlice;
