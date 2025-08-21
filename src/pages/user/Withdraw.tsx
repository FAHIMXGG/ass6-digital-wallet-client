import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWithdrawMutation, useMyWalletQuery } from '@/redux/features/wallet/wallet.api';
import {
  DollarSign,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Minus,
  CreditCard,
  Banknote,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState<'bank' | 'card'>('bank');
  
  const [withdraw, { isLoading: isWithdrawLoading }] = useWithdrawMutation();
  const { data: myWalletData, isLoading: isMyWalletLoading } = useMyWalletQuery();

  const myWallet = myWalletData?.data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const withdrawAmount = parseFloat(amount);
    
    // Check if user has sufficient balance
    if (myWallet && withdrawAmount > myWallet.balance) {
      toast.error(`Insufficient balance. Available: ${formatCurrency(myWallet.balance)}`);
      return;
    }

    // Check minimum withdrawal amount
    if (withdrawAmount < 10) {
      toast.error('Minimum withdrawal amount is $10');
      return;
    }

    try {
      await withdraw({
        amount: withdrawAmount,
      }).unwrap();
      
      toast.success(`Successfully initiated withdrawal of ${formatCurrency(withdrawAmount)}`);
      setAmount('');
    } catch (error: any) {
      console.error('Withdraw error:', error);
      toast.error(error?.data?.message || 'Failed to process withdrawal');
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Withdraw Money</h1>
          <p className="text-gray-600">Withdraw funds from your wallet to your bank account or card</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* My Wallet Info */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <DollarSign className="h-5 w-5" />
              <span>Your Wallet</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-red-800">
              <div className="font-medium">{myWallet.userId.name}</div>
              <div className="text-xs">{myWallet.userId.email}</div>
              <div className="text-2xl font-bold text-red-600 mt-2">
                Available Balance: {formatCurrency(myWallet.balance)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Minus className="h-5 w-5 text-red-500" />
              <span>Withdraw Funds</span>
            </CardTitle>
            <CardDescription>
              Enter the amount you want to withdraw from your wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWithdraw} className="space-y-6">
              {/* Withdrawal Method */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Withdrawal Method
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={withdrawalMethod === 'bank' ? 'default' : 'outline'}
                    onClick={() => setWithdrawalMethod('bank')}
                    className={`flex items-center space-x-2 ${
                      withdrawalMethod === 'bank' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Banknote className="h-4 w-4" />
                    <span>Bank Transfer</span>
                  </Button>
                  <Button
                    type="button"
                    variant={withdrawalMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setWithdrawalMethod('card')}
                    className={`flex items-center space-x-2 ${
                      withdrawalMethod === 'card' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </Button>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <Label htmlFor="amount">Withdrawal Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (e.g., 100)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                  min="10"
                  step="0.01"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Available: {formatCurrency(myWallet.balance)} | Min: $10
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-sm text-gray-600">Quick Amounts</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[25, 50, 100, 250, 500].map((quickAmount) => (
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
                    className="text-xs bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                  >
                    Max ({formatCurrency(myWallet.balance)})
                  </Button>
                </div>
              </div>

              {/* Withdrawal Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isWithdrawLoading || !amount || parseFloat(amount) < 10}
              >
                {isWithdrawLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Withdrawal...
                  </>
                ) : (
                  <>
                    <Minus className="h-4 w-4 mr-2" />
                    Withdraw {amount ? formatCurrency(parseFloat(amount)) : ''}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Withdrawal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Withdrawal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Processing Time</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Bank Transfer: 1-3 business days</li>
                  <li>Card Withdrawal: 2-5 business days</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Fees</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Bank Transfer: $2.50 per transaction</li>
                  <li>Card Withdrawal: $3.00 per transaction</li>
                  <li>Minimum withdrawal: $10.00</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Sufficient balance in your wallet</li>
                  <li>Verified account (for security)</li>
                  <li>Valid withdrawal method</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>Important Notice</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-red-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Withdrawals are processed during business hours (Mon-Fri, 9 AM - 5 PM EST)</li>
                <li>Processing times may vary based on your bank or card provider</li>
                <li>Ensure your withdrawal method details are up to date</li>
                <li>Withdrawals are irreversible once processed</li>
                <li>Contact support if you don't receive your funds within the expected timeframe</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Withdraw;
