import React, { useState } from 'react';
import { useGetMyTransactionsQuery } from '@/redux/features/transactions/transactions.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, CreditCard, Send, ArrowDownToLine, TrendingUp, TrendingDown, Eye, AlertTriangle, CheckCircle, XCircle, Clock, History } from 'lucide-react';
import { format } from 'date-fns';

export default function MyHistory() {
  const [selectedType, setSelectedType] = useState<'send' | 'receive' | 'withdraw' | 'deposit' | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'completed' | 'failed' | 'cancelled' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const queryParams = {
    type: selectedType === 'all' ? undefined : selectedType,
    status: selectedStatus === 'all' ? undefined : selectedStatus,
    limit: itemsPerPage,
    page: currentPage,
  };

  const { data, isLoading, error } = useGetMyTransactionsQuery(queryParams);

  const handleTypeChange = (type: 'send' | 'receive' | 'withdraw' | 'deposit' | 'all') => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleStatusChange = (status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'all') => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <Send className="h-4 w-4" />;
      case 'receive':
        return <ArrowDownToLine className="h-4 w-4" />;
      case 'withdraw':
        return <TrendingDown className="h-4 w-4" />;
      case 'deposit':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'send':
        return 'destructive';
      case 'receive':
        return 'default';
      case 'withdraw':
        return 'secondary';
      case 'deposit':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'send':
      case 'withdraw':
        return 'text-red-600';
      case 'receive':
      case 'deposit':
        return 'text-green-600';
      default:
        return '';
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'send':
      case 'withdraw':
        return '-';
      case 'receive':
      case 'deposit':
        return '+';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading transaction history...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">Error loading transaction history</div>
        </div>
      </div>
    );
  }

  const transactions = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const completedTransactions = transactions.filter(t => t.status === 'completed');
  const pendingTransactions = transactions.filter(t => t.status === 'pending');
  
  const totalSpent = completedTransactions
    .filter(t => t.type === 'send' || t.type === 'withdraw')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalReceived = completedTransactions
    .filter(t => t.type === 'receive' || t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <History className="h-8 w-8" />
            My Transaction History
          </h1>
          <p className="text-muted-foreground">
            View and filter your transaction history
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {selectedType === 'all' ? 'All Types' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleTypeChange('all')}>
                <CreditCard className="h-4 w-4 mr-2" />
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('send')}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('receive')}>
                <ArrowDownToLine className="h-4 w-4 mr-2" />
                Receive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('withdraw')}>
                <TrendingDown className="h-4 w-4 mr-2" />
                Withdraw
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('deposit')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Deposit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {selectedStatus === 'all' ? 'All Status' : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('all')}>
                <CreditCard className="h-4 w-4 mr-2" />
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                <Clock className="h-4 w-4 mr-2" />
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('failed')}>
                <XCircle className="h-4 w-4 mr-2" />
                Failed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('cancelled')}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.totalItems || 0}</div>
            <p className="text-xs text-muted-foreground">
              All transactions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Sent</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalSpent)}</div>
            <p className="text-xs text-muted-foreground">
              Sent & withdrawn
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Received</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalReceived)}</div>
            <p className="text-xs text-muted-foreground">
              Received & deposited
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingTransactions.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium">#{transaction._id.slice(-8)}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.description || 'No description'}
                        </div>
                        {/* Show recipient/sender info if available */}
                        {transaction.recipient && transaction.type === 'send' && (
                          <div className="text-xs text-muted-foreground">
                            To: {transaction.recipient.name}
                          </div>
                        )}
                        {transaction.sender && transaction.type === 'receive' && (
                          <div className="text-xs text-muted-foreground">
                            From: {transaction.sender.name}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(transaction.type)} className="flex items-center gap-1 w-fit">
                        {getTypeIcon(transaction.type)}
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(transaction.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(transaction.status)}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${getAmountColor(transaction.type)}`}>
                        {getAmountPrefix(transaction.type)}{formatCurrency(transaction.amount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(transaction.createdAt)}</div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Could open a transaction detail modal here
                          console.log('View transaction:', transaction._id);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* No Transactions Message */}
      {transactions.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-center">
              <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No transactions found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your transaction history will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
