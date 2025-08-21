export interface IWalletUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface IWallet {
  _id: string;
  userId: IWalletUser;
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
  __v: number;
}

export interface IAddMoneyRequest {
  amount: number;
}
