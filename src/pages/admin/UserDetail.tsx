import React from 'react';
import { useParams, Navigate } from 'react-router';
import { useGetUserByIdQuery } from '@/redux/features/user/user.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Shield, ShieldCheck, Mail, Phone, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/users" />;
  }

  const { data, isLoading, error } = useGetUserByIdQuery(id);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4" />;
      case 'agent':
        return <Shield className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'agent':
        return 'secondary';
      case 'user':
        return 'default';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading user details...</div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">Error loading user details</div>
        </div>
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.history.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <p className="text-muted-foreground">
            Detailed information for {user.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <div className="mt-1">
                  <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1 w-fit">
                    {getRoleIcon(user.role)}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </label>
                <p className="text-sm">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone
                </label>
                <p className="text-sm">{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant={user.isEmailVerified ? "default" : "secondary"}>
                {user.isEmailVerified ? "Email Verified" : "Email Pending"}
              </Badge>
              <Badge variant={user.isApproved ? "default" : "destructive"}>
                {user.isApproved ? "Approved" : "Pending Approval"}
              </Badge>
              {user.wallet.isBlocked && (
                <Badge variant="destructive">Wallet Blocked</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Wallet Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current Balance</label>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(user.wallet.balance)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Daily Spent</label>
                  <p className="text-sm">{formatCurrency(user.wallet.dailySpentAmount)}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.wallet.dailyTransactionCount} transactions
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Monthly Spent</label>
                  <p className="text-sm">{formatCurrency(user.wallet.monthlySpentAmount)}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.wallet.monthlyTransactionCount} transactions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timestamps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timestamps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                <p className="text-sm">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                <p className="text-sm">{formatDate(user.updatedAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Wallet Created</label>
                <p className="text-sm">{formatDate(user.wallet.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Wallet Updated</label>
                <p className="text-sm">{formatDate(user.wallet.updatedAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Daily Reset</label>
                <p className="text-sm">{formatDate(user.wallet.lastDailyReset)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Monthly Reset</label>
                <p className="text-sm">{formatDate(user.wallet.lastMonthlyReset)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System IDs */}
      <Card>
        <CardHeader>
          <CardTitle>System IDs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">User ID</label>
              <p className="text-xs font-mono bg-muted p-2 rounded">{user._id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Wallet ID</label>
              <p className="text-xs font-mono bg-muted p-2 rounded">{user.wallet._id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
