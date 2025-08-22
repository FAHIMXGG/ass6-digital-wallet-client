import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import { useGetTransactionsQuery } from "@/redux/features/transactions/transactions.api";
import { Users, UserCheck, CreditCard, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function Overview() {
  // Fetch users data
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery({ limit: 1000 });
  
  // Fetch transactions data
  const { data: transactionsData, isLoading: transactionsLoading } = useGetTransactionsQuery({ limit: 1000 });

  // Calculate statistics
  const totalUsers = usersData?.data?.data?.filter(user => user.role === "user").length || 0;
  const totalAgents = usersData?.data?.data?.filter(user => user.role === "agent").length || 0;
  const totalTransactions = transactionsData?.data?.data?.length || 0;
  const totalVolume = transactionsData?.data?.data?.reduce((sum, transaction) => {
    if (transaction.status === "completed") {
      return sum + transaction.amount;
    }
    return sum;
  }, 0) || 0;

  // Calculate recent statistics (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentTransactions = transactionsData?.data?.data?.filter(transaction => 
    new Date(transaction.createdAt) > thirtyDaysAgo
  ) || [];
  
  const recentVolume = recentTransactions.reduce((sum, transaction) => {
    if (transaction.status === "completed") {
      return sum + transaction.amount;
    }
    return sum;
  }, 0);

  const isLoading = usersLoading || transactionsLoading;

  const statsCards = [
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      description: "Registered users",
      trend: "+12% from last month",
      trendUp: true,
    },
    {
      title: "Total Agents",
      value: totalAgents.toLocaleString(),
      icon: UserCheck,
      description: "Active agents",
      trend: "+8% from last month",
      trendUp: true,
    },
    {
      title: "Transaction Count",
      value: totalTransactions.toLocaleString(),
      icon: CreditCard,
      description: "Total transactions",
      trend: "+15% from last month",
      trendUp: true,
    },
    {
      title: "Total Volume",
      value: `$${totalVolume.toLocaleString()}`,
      icon: DollarSign,
      description: "Transaction volume",
      trend: "+23% from last month",
      trendUp: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded mb-2"></div>
                <div className="h-4 w-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="flex items-center mt-2">
                  {stat.trendUp ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest transaction activity
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactionsData?.data?.data?.slice(0, 5).map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-500' :
                      transaction.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium">
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ${transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Summary</CardTitle>
            <p className="text-sm text-muted-foreground">
              Key metrics for the last 30 days
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Recent Transactions</span>
                <span className="text-sm font-medium">{recentTransactions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Recent Volume</span>
                <span className="text-sm font-medium">${recentVolume.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rate</span>
                <span className="text-sm font-medium">
                  {totalTransactions > 0 
                    ? Math.round((transactionsData?.data?.data?.filter(t => t.status === 'completed').length || 0) / totalTransactions * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Users</span>
                <span className="text-sm font-medium">
                  {usersData?.data?.data?.filter(user => user.isApproved).length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}