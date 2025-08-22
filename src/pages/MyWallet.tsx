import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMyWalletQuery, useAddMoneyMutation } from '@/redux/features/wallet/wallet.api';
import { Wallet, DollarSign, TrendingUp, TrendingDown, Shield, Clock, Calendar, AlertCircle, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const MyWallet = () => {
    const { data: walletData, isLoading, error, refetch } = useMyWalletQuery();
    const [addMoney, { isLoading: isAddingMoney }] = useAddMoneyMutation();
    const [amount, setAmount] = useState('');
    const [showAddMoneyForm, setShowAddMoneyForm] = useState(false);

    const wallet = walletData?.data;

    const handleAddMoney = async (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        
        if (!numAmount || numAmount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        try {
            await addMoney({ amount: numAmount }).unwrap();
            toast.success('Money added successfully!');
            setAmount('');
            setShowAddMoneyForm(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to add money');
        }
    };

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
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading wallet information...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load wallet</h3>
                    <p className="text-muted-foreground mb-4">Unable to fetch your wallet information.</p>
                    <Button onClick={() => refetch()}>Try Again</Button>
                </div>
            </div>
        );
    }

    if (!wallet) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No wallet found</h3>
                    <p className="text-muted-foreground">Your wallet information is not available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">My Wallet</h1>
                <p className="text-muted-foreground">Manage your digital wallet and track your transactions</p>
            </div>

            {/* Main Balance Card */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center space-x-2">
                                <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                <span>Current Balance</span>
                            </CardTitle>
                            <CardDescription>Your available wallet balance</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            {wallet.isBlocked && (
                                <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
                                    <Shield className="h-4 w-4" />
                                    <span className="text-sm font-medium">Blocked</span>
                                </div>
                            )}
                            <Button
                                onClick={() => setShowAddMoneyForm(!showAddMoneyForm)}
                                className="flex items-center space-x-2"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Money</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-foreground mb-2">
                            {formatCurrency(wallet.balance)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Last updated: {formatDate(wallet.updatedAt)}
                        </p>
                    </div>

                    {/* Add Money Form */}
                    {showAddMoneyForm && (
                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                            <form onSubmit={handleAddMoney} className="space-y-4">
                                <div>
                                    <Label htmlFor="amount">Amount to Add</Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            min="0"
                                            step="0.01"
                                            className="flex-1"
                                            required
                                        />
                                        <Button 
                                            type="submit" 
                                            disabled={isAddingMoney}
                                            className="flex items-center space-x-2"
                                        >
                                            {isAddingMoney ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <DollarSign className="h-4 w-4" />
                                            )}
                                            <span>{isAddingMoney ? 'Adding...' : 'Add Money'}</span>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Daily Spending */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Daily Spending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                            <span className="text-2xl font-bold text-foreground">{formatCurrency(wallet.dailySpentAmount)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {wallet.dailyTransactionCount} transactions today
                        </p>
                    </CardContent>
                </Card>

                {/* Monthly Spending */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Spending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                            <span className="text-2xl font-bold text-foreground">{formatCurrency(wallet.monthlySpentAmount)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {wallet.monthlyTransactionCount} transactions this month
                        </p>
                    </CardContent>
                </Card>

                {/* Daily Reset */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Daily Reset</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-foreground">
                                {formatDate(wallet.lastDailyReset)}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Last daily reset
                        </p>
                    </CardContent>
                </Card>

                {/* Monthly Reset */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Reset</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-foreground">
                                {formatDate(wallet.lastMonthlyReset)}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Last monthly reset
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Wallet Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Wallet Details</CardTitle>
                    <CardDescription>Additional information about your wallet</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium text-muted-foreground">Wallet ID</Label>
                            <p className="text-sm text-foreground font-mono">{wallet._id}</p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-muted-foreground">User ID</Label>
                            <p className="text-sm text-foreground font-mono">{wallet.userId.toString()}</p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                            <p className="text-sm">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    wallet.isBlocked 
                                        ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' 
                                        : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                                }`}>
                                    {wallet.isBlocked ? 'Blocked' : 'Active'}
                                </span>
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                            <p className="text-sm text-foreground">{formatDate(wallet.createdAt)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyWallet;