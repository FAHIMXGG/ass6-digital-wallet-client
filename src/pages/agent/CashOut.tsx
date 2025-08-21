import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCashOutMutation, useAllWalletsQuery } from '@/redux/features/wallet/wallet.api';
import {
  DollarSign,
  User,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Minus,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const CashOut = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  
  const [cashOut, { isLoading: isCashOutLoading }] = useCashOutMutation();
  const { data: walletsData, isLoading: isWalletsLoading } = useAllWalletsQuery({
    page: 1,
    limit: 100, // Get more wallets for selection
  });

  const wallets = walletsData?.data?.data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleWalletSelect = (wallet: any) => {
    setSelectedWallet(wallet);
    setUserId(wallet.userId._id);
  };

  const handleCashOut = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      toast.error('Please select a user or enter a user ID');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const cashOutAmount = parseFloat(amount);
    
    // Check if user has sufficient balance
    if (selectedWallet && cashOutAmount > selectedWallet.balance) {
      toast.error(`Insufficient balance. Available: ${formatCurrency(selectedWallet.balance)}`);
      return;
    }

    try {
      await cashOut({
        userId: userId.trim(),
        amount: cashOutAmount,
      }).unwrap();
      
      toast.success(`Successfully withdrew ${formatCurrency(cashOutAmount)} from wallet`);
      setAmount('');
      setSelectedWallet(null);
      setUserId('');
    } catch (error: any) {
      console.error('Cash out error:', error);
      toast.error(error?.data?.message || 'Failed to withdraw money from wallet');
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  const handleMaxAmount = () => {
    if (selectedWallet) {
      setAmount(selectedWallet.balance.toString());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/agent')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Agent Dashboard
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cash Out</h1>
          <p className="text-gray-600">Withdraw money from user wallets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Out Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Minus className="h-5 w-5 text-red-500" />
              <span>Withdraw Money from Wallet</span>
            </CardTitle>
            <CardDescription>
              Enter user ID and amount to withdraw money from their wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCashOut} className="space-y-4">
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter user ID (e.g., 688a4d720aa0b48251eb30a1)"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="mt-1"
                  required
                />
                {selectedWallet && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="text-sm text-blue-800">
                      <div className="font-medium">{selectedWallet.userId.name}</div>
                      <div className="text-xs">{selectedWallet.userId.email}</div>
                      <div className="text-xs">Current Balance: {formatCurrency(selectedWallet.balance)}</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="amount">Amount to Withdraw</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (e.g., 1)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                  min="0"
                  step="0.01"
                  required
                />
                {selectedWallet && (
                  <div className="mt-1 text-xs text-gray-500">
                    Available: {formatCurrency(selectedWallet.balance)}
                  </div>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-sm text-gray-600">Quick Amounts</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[1, 10, 50, 100, 500].map((quickAmount) => (
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
                  {selectedWallet && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleMaxAmount}
                      className="text-xs bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                    >
                      Max ({formatCurrency(selectedWallet.balance)})
                    </Button>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isCashOutLoading || !userId.trim() || !amount}
              >
                {isCashOutLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Withdrawing Money...
                  </>
                ) : (
                  <>
                    <Minus className="h-4 w-4 mr-2" />
                    Withdraw Money
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
              Choose a user from the list to auto-fill the user ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isWalletsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading users...</span>
              </div>
            ) : wallets.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {wallets.map((wallet) => (
                  <div
                    key={wallet._id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedWallet?._id === wallet._id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleWalletSelect(wallet)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{wallet.userId.name}</div>
                        <div className="text-xs text-gray-500">{wallet.userId.email}</div>
                        <div className="text-xs text-gray-400">ID: {wallet.userId._id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">
                          {formatCurrency(wallet.balance)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {wallet.isBlocked ? (
                            <span className="text-red-600">Blocked</span>
                          ) : (
                            <span className="text-green-600">Active</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">No wallets are currently available.</p>
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
              <h4 className="font-medium mb-2">Method 1: Select User</h4>
              <p className="text-gray-600">
                Click on a user from the right panel to auto-fill their user ID and see their current balance.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Method 2: Enter User ID</h4>
              <p className="text-gray-600">
                Manually enter the user ID in the input field. You can copy it from the user list or other sources.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quick Amounts</h4>
              <p className="text-gray-600">
                Use the quick amount buttons to quickly set common amounts, or use "Max" to withdraw the full balance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <Card className="mt-6 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>Important Notice</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-red-700">
            <ul className="list-disc list-inside space-y-1">
              <li>Cash out operations are irreversible</li>
              <li>Ensure you have proper authorization before withdrawing funds</li>
              <li>Verify the user ID and amount before confirming</li>
              <li>Users must have sufficient balance for the withdrawal</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashOut;
