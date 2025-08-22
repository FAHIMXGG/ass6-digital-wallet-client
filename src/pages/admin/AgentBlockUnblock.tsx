import React, { useState } from 'react';
import { useGetUsersQuery, useGetUserByIdQuery, useApproveAgentMutation, useSuspendAgentMutation } from '@/redux/features/user/user.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { UserDetailModal } from '@/components/UserDetailModal';

export default function AgentBlockUnblock() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams = {
    role: 'agent' as const,
    limit: itemsPerPage,
    page: currentPage,
  };

  const { data, isLoading, error, refetch } = useGetUsersQuery(queryParams);
  const { data: agentDetail } = useGetUserByIdQuery(selectedAgentId || '', {
    skip: !selectedAgentId,
  });
  const [approveAgent, { isLoading: isApproving }] = useApproveAgentMutation();
  const [suspendAgent, { isLoading: isSuspending }] = useSuspendAgentMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApproveAgent = async (agentId: string, agentName: string) => {
    try {
      await approveAgent(agentId).unwrap();
      toast.success(`Agent ${agentName} has been approved successfully!`);
      refetch();
    } catch (error) {
      toast.error('Failed to approve agent. Please try again.');
    }
  };

  const handleSuspendAgent = async (agentId: string, agentName: string) => {
    try {
      await suspendAgent(agentId).unwrap();
      toast.success(`Agent ${agentName} has been suspended successfully!`);
      refetch();
    } catch (error) {
      toast.error('Failed to suspend agent. Please try again.');
    }
  };

  const handleViewAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAgentId(null);
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
          <div className="text-lg">Loading agents...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">Error loading agents</div>
        </div>
      </div>
    );
  }

  const agents = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const approvedAgents = agents.filter(agent => agent.isApproved);
  const pendingAgents = agents.filter(agent => !agent.isApproved);
  const blockedAgents = agents.filter(agent => agent.wallet.isBlocked);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Management</h1>
          <p className="text-muted-foreground">
            Approve, suspend, and manage agent accounts
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.totalItems || 0}</div>
            <p className="text-xs text-muted-foreground">
              Registered agents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedAgents.length}</div>
            <p className="text-xs text-muted-foreground">
              Active agents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingAgents.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{blockedAgents.length}</div>
            <p className="text-xs text-muted-foreground">
              Suspended agents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Agent List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Wallet Balance</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">{agent.email}</div>
                        <div className="text-sm text-muted-foreground">{agent.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={agent.isEmailVerified ? "default" : "secondary"}>
                          {agent.isEmailVerified ? "Email Verified" : "Email Pending"}
                        </Badge>
                        <Badge variant={agent.isApproved ? "default" : "destructive"}>
                          {agent.isApproved ? "Approved" : "Pending Approval"}
                        </Badge>
                        {agent.wallet.isBlocked && (
                          <Badge variant="destructive">Wallet Blocked</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium">{formatCurrency(agent.wallet.balance)}</div>
                        <div className="text-sm text-muted-foreground">
                          Daily: {formatCurrency(agent.wallet.dailySpentAmount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Monthly: {formatCurrency(agent.wallet.monthlySpentAmount)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(agent.createdAt)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(agent.updatedAt)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        {!agent.isApproved ? (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApproveAgent(agent._id, agent.name)}
                            disabled={isApproving}
                            className="flex items-center gap-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleSuspendAgent(agent._id, agent.name)}
                            disabled={isSuspending}
                            className="flex items-center gap-1"
                          >
                            <XCircle className="h-4 w-4" />
                            Suspend
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewAgent(agent._id)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
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

      {/* No Agents Message */}
      {agents.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-center">
              <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No agents found</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Detail Modal */}
      <UserDetailModal
        user={agentDetail?.data || null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
