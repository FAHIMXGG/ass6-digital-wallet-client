import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSendMoneyMutation, useMyWalletQuery } from '@/redux/features/wallet/wallet.api';
import { useSearchUsersQuery } from '@/redux/features/user/user.api';
import {
  DollarSign,
  User,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Send,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const SendMoney = () => {
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);
  
  const [sendMoney, { isLoading: isSendMoneyLoading }] = useSendMoneyMutation();
  const { data: myWalletData, isLoading: isMyWalletLoading } = useMyWalletQuery();
  
  // Only search when there's a search term with at least 2 characters
  const { data: searchUsersData, isLoading: isSearchLoading } = useSearchUsersQuery(
    { search: searchTerm, limit: 20 },
    { skip: searchTerm.length < 2 }
  );

  const myWallet = myWalletData?.data;
  const searchedUsers = searchUsersData?.data || [];

  // Filter out current user from search results
  const filteredUsers = searchedUsers.filter((user) => {
    return myWallet ? user._id !== myWallet.userId._id : true;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleReceiverSelect = (user: any) => {
    setSelectedReceiver(user);
    setReceiverId(user._id);
  };

  const handleSendMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receiverId.trim()) {
      toast.error('Please select a receiver or enter a receiver ID');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const sendAmount = parseFloat(amount);
    
    // Check if user has sufficient balance
    if (myWallet && sendAmount > myWallet.balance) {
      toast.error(`Insufficient balance. Available: ${formatCurrency(myWallet.balance)}`);
      return;
    }

    // Check if trying to send to self
    if (myWallet && receiverId === myWallet.userId._id) {
      toast.error('You cannot send money to yourself');
      return;
    }

    try {
      await sendMoney({
        receiverId: receiverId.trim(),
        amount: sendAmount,
      }).unwrap();
      
      toast.success(`Successfully sent ${formatCurrency(sendAmount)} to ${selectedReceiver?.name || 'user'}`);
      setAmount('');
      setSelectedReceiver(null);
      setReceiverId('');
      setSearchTerm('');
    } catch (error: any) {
      console.error('Send money error:', error);
      toast.error(error?.data?.message || 'Failed to send money');
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  const handleMaxAmount = () => {
    if (myWallet) {
      setAmount(myWallet.balance.toString());
    }
  };

  if (isMyWalletLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading your wallet...</span>
        </div>
      </div>
    );
  }

  if (!myWallet) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet not found</h3>
          <p className="text-gray-600 mb-4">Unable to load your wallet information.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Money</h1>
          <p className="text-gray-600">Send money to other users</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Money Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-blue-500" />
              <span>Send Money</span>
            </CardTitle>
            <CardDescription>
              Search for a user or enter receiver ID and amount to send money
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* My Wallet Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <div className="font-medium">Your Wallet</div>
                <div className="text-xs">{myWallet.userId.name}</div>
                <div className="text-xs">{myWallet.userId.email}</div>
                <div className="text-lg font-bold text-blue-600 mt-1">
                  Balance: {formatCurrency(myWallet.balance)}
                </div>
              </div>
            </div>

            <form onSubmit={handleSendMoney} className="space-y-4">
              <div>
                <Label htmlFor="receiverId">Receiver ID</Label>
                <Input
                  id="receiverId"
                  type="text"
                  placeholder="Enter receiver ID (e.g., 688a500cb5aa9c4283885ec8)"
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  className="mt-1"
                  required
                />
                {selectedReceiver && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <div className="text-sm text-green-800">
                      <div className="font-medium">{selectedReceiver.name}</div>
                      <div className="text-xs">{selectedReceiver.email}</div>
                      <div className="text-xs">Phone: {selectedReceiver.phone}</div>
                      <div className="text-xs">ID: {selectedReceiver._id}</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="amount">Amount to Send</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (e.g., 100)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                  min="0"
                  step="0.01"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Available: {formatCurrency(myWallet.balance)}
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-sm text-gray-600">Quick Amounts</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[10, 25, 50, 100, 500].map((quickAmount) => (
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
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleMaxAmount}
                    className="text-xs bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  >
                    Max ({formatCurrency(myWallet.balance)})
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSendMoneyLoading || !receiverId.trim() || !amount}
              >
                {isSendMoneyLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Money...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Money
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
              <span>Select Receiver</span>
            </CardTitle>
            <CardDescription>
              Search by email or phone number to find and select a receiver
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by email or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchTerm.length > 0 && searchTerm.length < 2 && (
                <div className="mt-1 text-xs text-gray-500">
                  Type at least 2 characters to search
                </div>
              )}
            </div>

            {searchTerm.length < 2 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Users</h3>
                <p className="text-gray-600">
                  Enter an email address or phone number to search for users
                </p>
              </div>
            ) : isSearchLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Searching users...</span>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedReceiver?._id === user._id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleReceiverSelect(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-500">{user.phone}</div>
                        <div className="text-xs text-gray-400">ID: {user._id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 capitalize">
                          {user.role}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.isEmailVerified ? (
                            <span className="text-green-600">Verified</span>
                          ) : (
                            <span className="text-yellow-600">Unverified</span>
                          )}
                        </div>
                        {user.role === 'agent' && (
                          <div className="text-xs text-gray-500">
                            {user.isApproved ? (
                              <span className="text-green-600">Approved</span>
                            ) : (
                              <span className="text-red-600">Pending</span>
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
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">
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
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>How to Use</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Method 1: Search & Select</h4>
              <p className="text-gray-600">
                Search for users by email or phone number, then click on a user to auto-fill their receiver ID.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Method 2: Enter Receiver ID</h4>
              <p className="text-gray-600">
                Manually enter the receiver ID in the input field if you already know the user's ID.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quick Amounts</h4>
              <p className="text-gray-600">
                Use the quick amount buttons to quickly set common amounts, or use "Max" to send your full balance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notice */}
      <Card className="mt-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <AlertCircle className="h-5 w-5" />
            <span>Important Notice</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-blue-700">
            <ul className="list-disc list-inside space-y-1">
              <li>Money transfers are instant and irreversible</li>
              <li>Ensure you have sufficient balance before sending</li>
              <li>Verify the receiver ID and amount before confirming</li>
              <li>You cannot send money to yourself</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoney;

