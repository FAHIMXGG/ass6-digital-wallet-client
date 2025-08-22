import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transactions/transactions.api";
import { 
  Wallet, 
  Send, 
  Download, 
  History, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Loader2,
  AlertCircle,
  Shield,
  ShieldOff,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function UserOverview() {
  // Fetch user's wallet data
  const { data: walletData, isLoading: walletLoading, error: walletError } = useMyWalletQuery();
  
  // Fetch recent transactions
  const { data: transactionsData, isLoading: transactionsLoading } = useGetMyTransactionsQuery({ 
    limit: 5 
  });

  const wallet = walletData?.data;
  const transactions = transactionsData?.data?.data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'withdraw':
        return <Download className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      case 'deposit':
      case 'cash_in':
        return <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'cash_out':
        return <TrendingDown className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />;
      case 'failed':
        return <XCircle className="h-3 w-3 text-red-600 dark:text-red-400" />;
      case 'cancelled':
        return <AlertTriangle className="h-3 w-3 text-orange-600 dark:text-orange-400" />;
      default:
        return <Activity className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'send':
        return 'Sent';
      case 'receive':
        return 'Received';
      case 'withdraw':
        return 'Withdrawn';
      case 'deposit':
        return 'Deposited';
      case 'cash_in':
        return 'Cash In';
      case 'cash_out':
        return 'Cash Out';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  if (walletLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading your wallet...</span>
        </div>
      </div>
    );
  }

  if (walletError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load wallet</h3>
          <p className="text-muted-foreground mb-4">Unable to fetch your wallet information.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your wallet and recent activity.
        </p>
      </div>

      {/* Wallet Balance Card */}
      <div className="grid gap-6 mb-8">
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-6 w-6 text-primary" />
              <span>Wallet Balance</span>
              {wallet?.isBlocked && (
                <ShieldOff className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {formatCurrency(wallet?.balance || 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Available balance
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    wallet?.isBlocked 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' 
                      : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                  }`}>
                    {wallet?.isBlocked ? (
                      <>
                        <ShieldOff className="h-3 w-3 mr-1" />
                        Blocked
                      </>
                    ) : (
                      <>
                        <Shield className="h-3 w-3 mr-1" />
                        Active
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {wallet && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Daily Spending</div>
                    <div className="text-lg font-semibold text-foreground">
                      {formatCurrency(wallet.dailySpentAmount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {wallet.dailyTransactionCount} transactions today
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Spending</div>
                    <div className="text-lg font-semibold text-foreground">
                      {formatCurrency(wallet.monthlySpentAmount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {wallet.monthlyTransactionCount} transactions this month
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Common actions you can perform with your wallet
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/user/send-money">
                <Button className="w-full h-auto p-4 flex flex-col items-center space-y-2" variant="outline">
                  <Send className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-medium">Send Money</div>
                    <div className="text-xs text-muted-foreground">Transfer to other users</div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/user/withdraw">
                <Button className="w-full h-auto p-4 flex flex-col items-center space-y-2" variant="outline">
                  <Download className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  <div>
                    <div className="font-medium">Withdraw</div>
                    <div className="text-xs text-muted-foreground">Withdraw funds</div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/user/my-history">
                <Button className="w-full h-auto p-4 flex flex-col items-center space-y-2" variant="outline">
                  <History className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <div>
                    <div className="font-medium">Transaction History</div>
                    <div className="text-xs text-muted-foreground">View all transactions</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Your latest transaction activity
            </p>
          </CardHeader>
          <CardContent>
            {transactionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading transactions...</span>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction._id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {getTransactionTypeLabel(transaction.type)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.description || `Transaction ${transaction._id.slice(-6)}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(transaction.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        transaction.type === 'send' || transaction.type === 'withdraw' || transaction.type === 'cash_out'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {transaction.type === 'send' || transaction.type === 'withdraw' || transaction.type === 'cash_out' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="flex items-center justify-end mt-1">
                        {getStatusIcon(transaction.status)}
                        <span className="text-xs text-muted-foreground ml-1 capitalize">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Link to="/user/my-history">
                    <Button variant="outline" size="sm">
                      View All Transactions
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No transactions yet</h3>
                <p className="text-muted-foreground">
                  Start by sending money or making a withdrawal to see your transaction history.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}