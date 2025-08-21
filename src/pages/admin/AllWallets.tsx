import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAllWalletsQuery, useToggleBlockWalletMutation } from '@/redux/features/wallet/wallet.api';
import {
  Wallet,
  Search,
  Filter,
  Shield,
  ShieldOff,
  DollarSign,
  Loader2,
  AlertCircle,
  RefreshCw,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from 'lucide-react';
import { toast } from 'sonner';

const AllWallets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [sortBy, setSortBy] = useState<'balance' | 'createdAt' | 'userId'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const { data: walletsData, isLoading, error, refetch } = useAllWalletsQuery({
    page: currentPage,
    limit: 10,
  });
  
  const [toggleBlockWallet, { isLoading: isToggling }] = useToggleBlockWalletMutation();

  // Safely extract wallets array with proper type checking
  const wallets = useMemo(() => {
    if (!walletsData || !walletsData.data) {
      return [];
    }
    
    // Handle nested data structure: data.data
    const actualData = walletsData.data.data || walletsData.data;
    
    // Handle both array and single object responses
    if (Array.isArray(actualData)) {
      return actualData;
    }
    
    // If it's a single wallet object, wrap it in an array
    if (typeof actualData === 'object' && actualData !== null) {
      return [actualData];
    }
    
    return [];
  }, [walletsData]);
  
  // Debug: Log the actual data structure
  console.log('walletsData:', walletsData);
  console.log('wallets:', wallets);

    // TODO: Implement server-side filtering and sorting
  // Currently using server-side pagination only
  // To implement filtering and sorting, update the API call to include:
  // - searchTerm as 'search' parameter
  // - statusFilter as 'status' parameter  
  // - sortBy as 'sortBy' parameter
  // - sortOrder as 'sortOrder' parameter

  // Server-side pagination data
  const pagination = walletsData?.data?.pagination;
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.totalItems || 0;
  const itemsPerPage = pagination?.itemsPerPage || 10;
  
  // Use the wallets directly since they're already paginated from server
  const paginatedWallets = wallets;

  // Statistics based on pagination data
  const stats = useMemo(() => {
    const totalWallets = totalItems; // From pagination
    const currentPageWallets = wallets.length;
    
    // For current page statistics
    const activeWallets = wallets.filter(w => !w.isBlocked).length;
    const blockedWallets = wallets.filter(w => w.isBlocked).length;
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
    const avgBalance = currentPageWallets > 0 ? totalBalance / currentPageWallets : 0;

    return {
      totalWallets, // Total from server pagination
      activeWallets, // Only current page
      blockedWallets, // Only current page
      totalBalance, // Only current page
      avgBalance, // Only current page
      currentPageWallets, // Items on current page
    };
  }, [wallets, totalItems]);

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
    });
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleToggleBlock = async (walletId: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus; // Toggle the status
      console.log('Sending request:', { walletId, isBlocked: newStatus });
      await toggleBlockWallet({ walletId, isBlocked: newStatus }).unwrap();
      toast.success(`Wallet ${newStatus ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      console.error('Error toggling wallet:', error);
      toast.error(`Failed to ${currentStatus ? 'unblock' : 'block'} wallet`);
    }
  };

  const SortIcon = ({ field }: { field: typeof sortBy }) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? 
      <TrendingUp className="h-4 w-4 ml-1" /> : 
      <TrendingDown className="h-4 w-4 ml-1" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading wallets...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load wallets</h3>
          <p className="text-gray-600 mb-4">Unable to fetch wallet information.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Wallets</h1>
        <p className="text-gray-600">Manage and monitor all user wallets</p>
      </div>

             {/* Statistics Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
               <Users className="h-4 w-4" />
               <span>Total Wallets</span>
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{stats.totalWallets}</div>
             <p className="text-xs text-gray-500 mt-1">All wallets</p>
           </CardContent>
         </Card>

         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
               <Shield className="h-4 w-4 text-green-500" />
               <span>Active (Page)</span>
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-green-600">{stats.activeWallets}</div>
             <p className="text-xs text-gray-500 mt-1">Current page only</p>
           </CardContent>
         </Card>

         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
               <ShieldOff className="h-4 w-4 text-red-500" />
               <span>Blocked (Page)</span>
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-red-600">{stats.blockedWallets}</div>
             <p className="text-xs text-gray-500 mt-1">Current page only</p>
           </CardContent>
         </Card>

         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
               <DollarSign className="h-4 w-4 text-blue-500" />
               <span>Balance (Page)</span>
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalBalance)}</div>
             <p className="text-xs text-gray-500 mt-1">Current page only</p>
           </CardContent>
         </Card>

         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
               <Activity className="h-4 w-4 text-purple-500" />
               <span>Avg Balance (Page)</span>
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.avgBalance)}</div>
             <p className="text-xs text-gray-500 mt-1">Current page only</p>
           </CardContent>
         </Card>
       </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                 <Input
                   id="search"
                   placeholder="Search by name, email, or wallet ID..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-10"
                 />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full h-9 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Wallets</option>
                <option value="active">Active Only</option>
                <option value="blocked">Blocked Only</option>
              </select>
            </div>

            <div className="flex items-end">
                             <Button
                 onClick={() => {
                   setSearchTerm('');
                   setStatusFilter('all');
                   setSortBy('createdAt');
                   setSortOrder('desc');
                   setCurrentPage(1);
                 }}
                 variant="outline"
                 className="w-full"
               >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

             {/* Results Summary */}
       <div className="mb-4 flex items-center justify-between">
         <p className="text-sm text-gray-600">
           Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
           {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
           {totalItems} wallets
         </p>
         <p className="text-sm text-gray-600">
           Page {currentPage} of {totalPages}
         </p>
       </div>

      {/* Wallets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Details</CardTitle>
          <CardDescription>
            Detailed information about all user wallets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {wallets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                                     <TableHead>
                     <Button
                       variant="ghost"
                       onClick={() => handleSort('userId')}
                       className="flex items-center space-x-1 p-0 h-auto font-medium"
                     >
                       <span>User</span>
                       <SortIcon field="userId" />
                     </Button>
                   </TableHead>
                  <TableHead>Wallet ID</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('balance')}
                      className="flex items-center space-x-1 p-0 h-auto font-medium"
                    >
                      <span>Balance</span>
                      <SortIcon field="balance" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Daily Spending</TableHead>
                  <TableHead>Monthly Spending</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('createdAt')}
                      className="flex items-center space-x-1 p-0 h-auto font-medium"
                    >
                      <span>Created</span>
                      <SortIcon field="createdAt" />
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                                 {paginatedWallets.map((wallet) => (
                   <TableRow key={wallet._id}>
                     <TableCell className="font-mono text-sm">
                       <div>
                         <div className="font-medium">{wallet.userId.name}</div>
                         <div className="text-xs text-gray-500">{wallet.userId.email}</div>
                         <div className="text-xs text-gray-400">{wallet.userId.role}</div>
                       </div>
                     </TableCell>
                     <TableCell className="font-mono text-sm">
                       {wallet._id}
                     </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(wallet.balance)}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        wallet.isBlocked 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {wallet.isBlocked ? (
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
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{formatCurrency(wallet.dailySpentAmount)}</div>
                        <div className="text-gray-500">{wallet.dailyTransactionCount} transactions</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{formatCurrency(wallet.monthlySpentAmount)}</div>
                        <div className="text-gray-500">{wallet.monthlyTransactionCount} transactions</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{formatDate(wallet.createdAt)}</div>
                      </div>
                    </TableCell>
                                         <TableCell>
                       <div className="relative">
                         <select
                           value=""
                           onChange={(e) => {
                             if (e.target.value === 'block' || e.target.value === 'unblock') {
                               handleToggleBlock(wallet._id, wallet.isBlocked);
                             }
                             e.target.value = '';
                           }}
                           className="w-full h-8 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           disabled={isToggling}
                         >
                           <option value="">Actions</option>
                           <option value={wallet.isBlocked ? 'unblock' : 'block'}>
                             {wallet.isBlocked ? 'Unblock' : 'Block'}
                           </option>
                         </select>
                       </div>
                     </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No wallets found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters.' 
                  : 'No wallets are currently available.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

             {/* Pagination */}
       {totalPages > 1 && (
         <div className="mt-6">
           <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={(page) => {
               setCurrentPage(page);
               // Scroll to top when page changes
               window.scrollTo({ top: 0, behavior: 'smooth' });
             }}
           />
         </div>
       )}
    </div>
  );
};

export default AllWallets;
