import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCashInMutation } from '@/redux/features/wallet/wallet.api';
import { useSearchUsersQuery } from '@/redux/features/user/user.api';
import {
  DollarSign,
  User,
  Loader2,
  AlertCircle,
  CheckCircle,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';

const CashIn = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [cashIn, { isLoading: isCashInLoading }] = useCashInMutation();
  
  // Only search when there's a search term with at least 2 characters
  const { data: searchUsersData, isLoading: isSearchLoading } = useSearchUsersQuery(
    { search: searchTerm, limit: 20 },
    { skip: searchTerm.length < 2 }
  );

  const searchedUsers = searchUsersData?.data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setUserId(user._id);
  };

  const handleCashIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      toast.error('Please select a user or enter a user ID');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      await cashIn({
        userId: userId.trim(),
        amount: parseFloat(amount),
      }).unwrap();
      
      toast.success(`Successfully added ${formatCurrency(parseFloat(amount))} to ${selectedUser?.name || 'user'}'s wallet`);
      setAmount('');
      setSelectedUser(null);
      setUserId('');
      setSearchTerm('');
    } catch (error: any) {
      console.error('Cash in error:', error);
      toast.error(error?.data?.message || 'Failed to add money to wallet');
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Cash In</h1>
          <p className="text-muted-foreground">Add money to user wallets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash In Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Add Money to Wallet</span>
            </CardTitle>
            <CardDescription>
              Search for a user or enter user ID and amount to add money to their wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCashIn} className="space-y-4">
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter user ID (e.g., 688a4dc497ad660d4909008d)"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="mt-1"
                  required
                />
                {selectedUser && (
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <div className="text-sm text-green-800 dark:text-green-400">
                      <div className="font-medium">{selectedUser.name}</div>
                      <div className="text-xs">{selectedUser.email}</div>
                      <div className="text-xs">Phone: {selectedUser.phone}</div>
                      <div className="text-xs">ID: {selectedUser._id}</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (e.g., 9990)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-sm text-muted-foreground">Quick Amounts</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[100, 500, 1000, 5000, 10000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(quickAmount)}
                      className="text-xs"
                    >
                      {formatCurrency(quickAmount)}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isCashInLoading || !userId.trim() || !amount}
              >
                {isCashInLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding Money...
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Add Money
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* User Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Select User</span>
            </CardTitle>
            <CardDescription>
              Search by email or phone number to find and select a user
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchTerm.length > 0 && searchTerm.length < 2 && (
                <div className="mt-1 text-xs text-muted-foreground">
                  Type at least 2 characters to search
                </div>
              )}
            </div>

            {searchTerm.length < 2 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Search Users</h3>
                <p className="text-muted-foreground">
                  Enter an email address or phone number to search for users
                </p>
              </div>
            ) : isSearchLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Searching users...</span>
              </div>
            ) : searchedUsers.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {searchedUsers.map((user) => (
                  <div
                    key={user._id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedUser?._id === user._id
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-border hover:border-border/60 hover:bg-muted/50'
                    }`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">{user.phone}</div>
                        <div className="text-xs text-muted-foreground/60">ID: {user._id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground capitalize">
                          {user.role}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.isEmailVerified ? (
                            <span className="text-green-600 dark:text-green-400">Verified</span>
                          ) : (
                            <span className="text-yellow-600 dark:text-yellow-400">Unverified</span>
                          )}
                        </div>
                        {user.role === 'agent' && (
                          <div className="text-xs text-muted-foreground">
                            {user.isApproved ? (
                              <span className="text-green-600 dark:text-green-400">Approved</span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400">Pending</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  No users found matching "{searchTerm}". Try searching with a different email or phone number.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span>How to Use</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-foreground">Method 1: Search & Select</h4>
              <p className="text-muted-foreground">
                Search for users by email or phone number, then click on a user to auto-fill their user ID.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-foreground">Method 2: Enter User ID</h4>
              <p className="text-muted-foreground">
                Manually enter the user ID in the input field if you already know the user's ID.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-foreground">Quick Amounts</h4>
              <p className="text-muted-foreground">
                Use the quick amount buttons to quickly set common amounts, or enter a custom amount manually.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashIn;

