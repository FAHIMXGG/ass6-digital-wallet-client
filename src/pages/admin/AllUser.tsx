import React, { useState } from 'react';
import { useGetUsersQuery, useGetUserByIdQuery } from '@/redux/features/user/user.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Users, User, Shield, ShieldCheck, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { UserDetailModal } from '@/components/UserDetailModal';

export default function AllUser() {
  const [selectedRole, setSelectedRole] = useState<'user' | 'agent' | 'admin' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams = {
    role: selectedRole === 'all' ? undefined : selectedRole,
    limit: itemsPerPage,
    page: currentPage,
  };

  const { data, isLoading, error } = useGetUsersQuery(queryParams);
  const { data: userDetail } = useGetUserByIdQuery(selectedUserId || '', {
    skip: !selectedUserId,
  });

  const handleRoleChange = (role: 'user' | 'agent' | 'admin' | 'all') => {
    setSelectedRole(role);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4" />;
      case 'agent':
        return <Shield className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
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
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
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
          <div className="text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">Error loading users</div>
        </div>
      </div>
    );
  }

  const users = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Users</h1>
          <p className="text-muted-foreground">
            Manage and view all registered users in the system
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {selectedRole === 'all' ? 'All Roles' : selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleRoleChange('all')}>
                <Users className="h-4 w-4 mr-2" />
                All Roles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange('user')}>
                <User className="h-4 w-4 mr-2" />
                Users
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange('agent')}>
                <Shield className="h-4 w-4 mr-2" />
                Agents
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange('admin')}>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Admins
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.totalItems || 0}</div>
            <p className="text-xs text-muted-foreground">
              Across all roles
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Page</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.currentPage || 1}</div>
            <p className="text-xs text-muted-foreground">
              of {pagination?.totalPages || 1} pages
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Per Page</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.itemsPerPage || 10}</div>
            <p className="text-xs text-muted-foreground">
              Showing {users.length} items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                               <TableRow>
                 <TableHead>User</TableHead>
                 <TableHead>Role</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead>Wallet Balance</TableHead>
                 <TableHead>Created</TableHead>
                 <TableHead>Last Updated</TableHead>
                 <TableHead>Actions</TableHead>
               </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-sm text-muted-foreground">{user.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1 w-fit">
                        {getRoleIcon(user.role)}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
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
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium">{formatCurrency(user.wallet.balance)}</div>
                        <div className="text-sm text-muted-foreground">
                          Daily: {formatCurrency(user.wallet.dailySpentAmount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Monthly: {formatCurrency(user.wallet.monthlySpentAmount)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(user.createdAt)}</div>
                    </TableCell>
                                         <TableCell>
                       <div className="text-sm">{formatDate(user.updatedAt)}</div>
                     </TableCell>
                     <TableCell>
                       <Button
                         variant="outline"
                         size="sm"
                         onClick={() => handleViewUser(user._id)}
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

             {/* No Users Message */}
       {users.length === 0 && (
         <Card>
           <CardContent className="flex items-center justify-center h-32">
             <div className="text-center">
               <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
               <p className="text-muted-foreground">No users found</p>
             </div>
           </CardContent>
         </Card>
       )}

       {/* User Detail Modal */}
       <UserDetailModal
         user={userDetail?.data || null}
         isOpen={isModalOpen}
         onClose={handleCloseModal}
       />
     </div>
   );
 }
