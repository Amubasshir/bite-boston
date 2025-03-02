import { AdminProtected } from '@/components/AdminProtected';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ClaimedDeal, getAllClaimedDeals } from '@/lib/mockData';
import { Download, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<ClaimedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const claimedDeals = await getAllClaimedDeals();
        setDeals(claimedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.dealTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      deal.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'used':
        return <Badge className="bg-blue-500">Used</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminProtected>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Claimed Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{deals.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {
                  deals.filter((deal) => deal.status.toLowerCase() === 'active')
                    .length
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Claimed Deals</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 max-w-xs"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} /> Export Data
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading deals...</div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Deal</TableHead>
                  <TableHead>Claimed Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.length > 0 ? (
                  filteredDeals.slice(0, 10).map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">
                        <div
                          className="cursor-pointer hover:underline"
                          onClick={() => navigate(`/admin/user/${deal.userId}`)}
                        >
                          {deal.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {deal.userEmail}
                        </div>
                      </TableCell>
                      <TableCell>{deal.dealTitle}</TableCell>
                      <TableCell>
                        {new Date(deal.claimedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(deal.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/user/${deal.userId}`);
                            }}
                          >
                            <User size={14} /> User
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No deals found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {filteredDeals.length > 10 && (
              <div className="p-4 text-center">
                <Button variant="outline">View All Deals</Button>
              </div>
            )}
          </Card>
        )}
      </div>
    </AdminProtected>
  );
};

export default AdminDashboard;
