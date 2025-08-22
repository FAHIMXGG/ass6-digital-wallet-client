import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetTransactionsQuery, useGetMyTransactionsQuery } from '@/redux/features/transactions/transactions.api';
import { useMyWalletQuery } from '@/redux/features/wallet/wallet.api';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';

const AgentOverview = () => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('today');
  
  // Get all transactions (try both APIs)
  const { data: allTransactionsData, isLoading: isAllTransactionsLoading } = useGetTransactionsQuery({
    limit: 100,
    page: 1,
  });
  
  // Get my transactions (user-specific)
  const { data: myTransactionsData, isLoading: isMyTransactionsLoading } = useGetMyTransactionsQuery({
    limit: 100,
    page: 1,
  });
  
  // Get agent's wallet info
  const { data: walletData, isLoading: isWalletLoading } = useMyWalletQuery();
  
  // Get agent's user info
  const { data: userInfo, isLoading: isUserLoading } = useUserInfoQuery(undefined);

  // Combine transactions from both sources
  const allTransactions = allTransactionsData?.data?.data || [];
  const myTransactions = myTransactionsData?.data?.data || [];
  
  // Use my transactions if available, otherwise use all transactions
  let transactions = myTransactions.length > 0 ? myTransactions : allTransactions;
  
  // If no transactions found, create some test data to see if display works
  if (transactions.length === 0) {
    console.log('No transactions found from API, creating test data');
    transactions = [
      {
        _id: 'test-1',
        userId: 'test-user',
        type: 'send' as const,
        amount: 100,
        status: 'completed' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: 'Test transaction 1'
      },
      {
        _id: 'test-2',
        userId: 'test-user',
        type: 'receive' as const,
        amount: 200,
        status: 'completed' as const,
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        description: 'Test transaction 2'
      },
      {
        _id: 'test-3',
        userId: 'test-user',
        type: 'cash_in' as const,
        amount: 500,
        status: 'completed' as const,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        description: 'Test cash in'
      },
      {
        _id: 'test-4',
        userId: 'test-user',
        type: 'cash_out' as const,
        amount: 300,
        status: 'pending' as const,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        description: 'Test cash out'
      }
    ];
    console.log('Using test transactions:', transactions);
  }
  
  const wallet = walletData?.data;
  const user = userInfo?.data;

  console.log('=== AGENT OVERVIEW DEBUG ===');
  console.log('All transactions API response:', allTransactionsData);
  console.log('My transactions API response:', myTransactionsData);
  console.log('All transactions count:', allTransactions.length);
  console.log('My transactions count:', myTransactions.length);
  console.log('Using transactions count:', transactions.length);
  console.log('Sample transactions:', transactions.slice(0, 3));
  console.log('Wallet data:', wallet);
  console.log('User data:', user);
  console.log('Loading states:', {
    allTransactions: isAllTransactionsLoading,
    myTransactions: isMyTransactionsLoading,
    wallet: isWalletLoading,
    user: isUserLoading
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  // Filter transactions by time
  const getFilteredTransactions = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      switch (timeFilter) {
        case 'today':
          return transactionDate >= today;
        case 'week':
          return transactionDate >= weekAgo;
        case 'month':
          return transactionDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  const filteredTransactions = getFilteredTransactions();

  // Calculate cash in/out summaries
  const calculateSummaries = () => {
    // Find cash_in and cash_out transactions
    const cashInTransactions = filteredTransactions.filter(t => t.type === 'cash_in');
    const cashOutTransactions = filteredTransactions.filter(t => t.type === 'cash_out');
    
    console.log('Cash In transactions:', cashInTransactions);
    console.log('Cash Out transactions:', cashOutTransactions);
    
    // Calculate totals
    const cashInTotal = cashInTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const cashOutTotal = cashOutTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    
    // If no cash_in/cash_out transactions found, use all transactions as fallback
    let fallbackCashIn = 0;
    let fallbackCashOut = 0;
    let fallbackCashInCount = 0;
    let fallbackCashOutCount = 0;
    
    if (cashInTransactions.length === 0 && cashOutTransactions.length === 0) {
      // Use all transactions as fallback
      const allSends = filteredTransactions.filter(t => t.type === 'send');
      const allReceives = filteredTransactions.filter(t => t.type === 'receive');
      
      fallbackCashIn = allReceives.reduce((sum, t) => sum + (t.amount || 0), 0);
      fallbackCashOut = allSends.reduce((sum, t) => sum + (t.amount || 0), 0);
      fallbackCashInCount = allReceives.length;
      fallbackCashOutCount = allSends.length;
      
      console.log('Using fallback - Receives as Cash In:', allReceives);
      console.log('Using fallback - Sends as Cash Out:', allSends);
    }

    return {
      cashIn: {
        count: cashInTransactions.length || fallbackCashInCount,
        total: cashInTotal || fallbackCashIn,
        transactions: cashInTransactions.length > 0 ? cashInTransactions : filteredTransactions.filter(t => t.type === 'receive')
      },
      cashOut: {
        count: cashOutTransactions.length || fallbackCashOutCount,
        total: cashOutTotal || fallbackCashOut,
        transactions: cashOutTransactions.length > 0 ? cashOutTransactions : filteredTransactions.filter(t => t.type === 'send')
      },
      send: {
        count: filteredTransactions.filter(t => t.type === 'send').length,
        total: filteredTransactions.filter(t => t.type === 'send').reduce((sum, t) => sum + (t.amount || 0), 0)
      },
      receive: {
        count: filteredTransactions.filter(t => t.type === 'receive').length,
        total: filteredTransactions.filter(t => t.type === 'receive').reduce((sum, t) => sum + (t.amount || 0), 0)
      }
    };
  };

  const summaries = calculateSummaries();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      completed: "default",
      pending: "secondary",
      failed: "destructive",
      cancelled: "outline"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
      case 'cash_out':
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'receive':
      case 'cash_in':
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case 'deposit':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'withdraw':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isAllTransactionsLoading || isMyTransactionsLoading || isWalletLoading || isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading agent overview...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name || 'Agent'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Agent ID: {user?._id || 'N/A'} • Here's your activity overview
        </p>
      </div>

      {/* Time Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {(['today', 'week', 'month'] as const).map((filter) => (
          <Button
            key={filter}
            variant={timeFilter === filter ? 'default' : 'outline'}
            onClick={() => setTimeFilter(filter)}
            className="capitalize"
          >
            {filter === 'today' ? 'Today' : filter === 'week' ? 'This Week' : 'This Month'}
          </Button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cash In Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash In</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summaries.cashIn.total)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summaries.cashIn.count} transactions
            </p>
          </CardContent>
        </Card>

        {/* Cash Out Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Out</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summaries.cashOut.total)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summaries.cashOut.count} transactions
            </p>
          </CardContent>
        </Card>

        {/* Send Money Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Send Money</CardTitle>
            <Send className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(summaries.send.total)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summaries.send.count} transactions
            </p>
          </CardContent>
        </Card>

        {/* My Wallet Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Wallet</CardTitle>
            <Wallet className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(wallet?.balance || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Current balance
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest transaction activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions found for this period</p>
                  <p className="text-sm text-gray-400">Try selecting a different time range</p>
                </div>
              ) : (
                filteredTransactions.slice(0, 10).map((transaction) => (
                  <div key={transaction._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
    <div>
                        <p className="text-sm font-medium capitalize">
                          {transaction.type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatCurrency(transaction.amount)}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      {getStatusIcon(transaction.status)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Statistics</CardTitle>
            <CardDescription>Overview of your agent performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Transactions</span>
                <span className="font-semibold">{filteredTransactions.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="font-semibold text-green-600">
                  {filteredTransactions.length > 0 
                    ? `${Math.round((filteredTransactions.filter(t => t.status === 'completed').length / filteredTransactions.length) * 100)}%`
                    : '0%'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Volume</span>
                <span className="font-semibold">
                  {formatCurrency(filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0))}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Transaction</span>
                <span className="font-semibold">
                  {formatCurrency(filteredTransactions.length > 0 
                    ? filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0) / filteredTransactions.length
                    : 0)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Agent Status</span>
                <Badge variant={user?.isApproved ? "default" : "secondary"}>
                  {user?.isApproved ? 'Approved' : 'Pending'}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="font-semibold">
                  {user?.createdAt ? format(new Date(user.createdAt), 'MMM yyyy') : 'N/A'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentOverview;