import { baseApi } from "@/redux/baseApi";
import type { IResponse, IWallet, IAddMoneyRequest } from "@/types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation<IResponse<IWallet>, IAddMoneyRequest>({
      query: (userInfo) => ({
        url: "/wallets/add-money",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["WALLET"],
    }),
    
    cashIn: builder.mutation<IResponse<IWallet>, { userId: string; amount: number }>({
      query: (cashInData) => ({
        url: "/wallets/add-money",
        method: "POST",
        data: cashInData,
      }),
      invalidatesTags: ["WALLET"],
    }),
    
    cashOut: builder.mutation<IResponse<IWallet>, { userId: string; amount: number }>({
      query: (cashOutData) => ({
        url: "/wallets/cash-out",
        method: "POST",
        data: cashOutData,
      }),
      invalidatesTags: ["WALLET"],
    }),
    
    sendMoney: builder.mutation<IResponse<IWallet>, { receiverId: string; amount: number }>({
      query: (sendMoneyData) => ({
        url: "/wallets/send-money",
        method: "POST",
        data: sendMoneyData,
      }),
      invalidatesTags: ["WALLET"],
    }),
    
    withdraw: builder.mutation<IResponse<IWallet>, { amount: number }>({
      query: (withdrawData) => ({
        url: "/wallets/withdraw",
        method: "POST",
        data: withdrawData,
      }),
      invalidatesTags: ["WALLET"],
    }),
    
    myWallet: builder.query<IResponse<IWallet>, void>({
      query: () => ({
        url: "/wallets/my-wallet",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    allWallets: builder.query<IResponse<{ data: IWallet[], pagination: any }>, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/wallets",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
      providesTags: ["WALLET"],
    }),
    
    toggleBlockWallet: builder.mutation<IResponse<{ isBlocked: boolean }>, { walletId: string; isBlocked: boolean }>({
      query: ({ walletId, isBlocked }) => {
        console.log('API Query - walletId:', walletId, 'isBlocked:', isBlocked);
        const requestData = { isBlocked };
        console.log('Request data:', requestData);
        console.log('Request data JSON:', JSON.stringify(requestData));
        return {
          url: `/wallets/block/${walletId}`,
          method: "PATCH",
          data: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ["WALLET"],
    }),
  }),
});

export const { 
  useAddMoneyMutation, 
  useCashInMutation,
  useCashOutMutation,
  useSendMoneyMutation,
  useWithdrawMutation,
  useMyWalletQuery, 
  useAllWalletsQuery,
  useToggleBlockWalletMutation
} = walletApi;