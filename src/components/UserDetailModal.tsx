import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Shield, ShieldCheck, Mail, Phone, Calendar, DollarSign, AlertTriangle, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import type { IUser } from '@/redux/features/user/user.api';

interface UserDetailModalProps {
  user: IUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  const navigate = useNavigate();
  
  if (!user) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Balance</label>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(user.wallet.balance)}
                  </p>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* IDs */}
          <Card>
            <CardHeader>
              <CardTitle>System IDs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
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
     
     <DialogFooter>
       <Button
         variant="outline"
         onClick={onClose}
       >
         Close
       </Button>
       <Button
         onClick={() => {
           onClose();
           navigate(`/user/${user._id}`);
         }}
         className="flex items-center gap-2"
       >
         <ExternalLink className="h-4 w-4" />
         View Full Details
       </Button>
     </DialogFooter>
   </DialogContent>
 </Dialog>
);
}
