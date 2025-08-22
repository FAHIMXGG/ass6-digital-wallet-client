import { baseApi } from "../../baseApi";
import type { IResponse } from "@/types";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "agent" | "admin";
  isEmailVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  wallet: {
    _id: string;
    userId: string;
    balance: number;
    isBlocked: boolean;
    dailySpentAmount: number;
    dailyTransactionCount: number;
    monthlySpentAmount: number;
    monthlyTransactionCount: number;
    lastDailyReset: string;
    lastMonthlyReset: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IUsersResponse {
  data: IUser[];
  pagination: IPagination;
}

export interface IGetUsersParams {
  role?: "user" | "agent" | "admin";
  limit?: number;
  page?: number;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IResponse<IUsersResponse>, IGetUsersParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        if (params.role) {
          searchParams.append("role", params.role);
        }
        
        if (params.limit) {
          searchParams.append("limit", params.limit.toString());
        }
        
        if (params.page) {
          searchParams.append("page", params.page.toString());
        }
        
        const queryString = searchParams.toString();
        return {
          url: `/users${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["USER"],
    }),
    getUserById: builder.query<IResponse<IUser>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "USER", id }],
    }),
    approveAgent: builder.mutation<IResponse<IUser>, string>({
      query: (id) => ({
        url: `/users/approve-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "USER", id }, "USER"],
    }),
    suspendAgent: builder.mutation<IResponse<IUser>, string>({
      query: (id) => ({
        url: `/users/suspend-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "USER", id }, "USER"],
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useApproveAgentMutation, 
  useSuspendAgentMutation 
} = userApi;
