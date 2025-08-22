import { baseApi } from "../../baseApi";
import type { IResponse } from "@/types";

export interface ITransaction {
  _id: string;
  userId: string;
  type: "send" | "receive" | "withdraw" | "deposit";
  amount: number;
  status: "pending" | "completed" | "failed" | "cancelled";
  description?: string;
  recipientId?: string;
  senderId?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  recipient?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  sender?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
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

export interface ITransactionsResponse {
  data: ITransaction[];
  pagination: IPagination;
}

export interface IGetTransactionsParams {
  type?: "send" | "receive" | "withdraw" | "deposit";
  status?: "pending" | "completed" | "failed" | "cancelled";
  limit?: number;
  page?: number;
  userId?: string;
}

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<IResponse<ITransactionsResponse>, IGetTransactionsParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        if (params.type) {
          searchParams.append("type", params.type);
        }
        
        if (params.status) {
          searchParams.append("status", params.status);
        }
        
        if (params.limit) {
          searchParams.append("limit", params.limit.toString());
        }
        
        if (params.page) {
          searchParams.append("page", params.page.toString());
        }
        
        if (params.userId) {
          searchParams.append("userId", params.userId);
        }
        
        const queryString = searchParams.toString();
        return {
          url: `/transactions${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTION"],
    }),
    getMyTransactions: builder.query<IResponse<ITransactionsResponse>, Omit<IGetTransactionsParams, 'userId'>>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        if (params.type) {
          searchParams.append("type", params.type);
        }
        
        if (params.status) {
          searchParams.append("status", params.status);
        }
        
        if (params.limit) {
          searchParams.append("limit", params.limit.toString());
        }
        
        if (params.page) {
          searchParams.append("page", params.page.toString());
        }
        
        const queryString = searchParams.toString();
        return {
          url: `/transactions/my-history${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTION"],
    }),
    getTransactionById: builder.query<IResponse<ITransaction>, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "TRANSACTION", id }],
    }),
  }),
});

export const { 
  useGetTransactionsQuery, 
  useGetMyTransactionsQuery,
  useGetTransactionByIdQuery 
} = transactionsApi;
