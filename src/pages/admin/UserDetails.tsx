import { AdminProtected } from '@/components/AdminProtected';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ClaimedDeal, getClaimedDealsByUserId } from '@/lib/mockData';
import { ArrowLeft, Ban, Download, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock user data
const mockUsers = {
  '1': {
    id: '1',
    email: 'john.smith@example.com',
    name: 'John Smith',
    phone: '(617) 555-1234',
    joinDate: '2023-10-15',
    totalClaims: 3,
  },
  '2': {
    id: '2',
    email: 'emily.j@example.com',
    name: 'Emily Johnson',
    phone: '(617) 555-5678',
    joinDate: '2023-09-22',
    totalClaims: 2,
  },
  '3': {
    id: '3',
    email: 'michael.b@example.com',
    name: 'Michael Brown',
    phone: '(617) 555-9012',
    joinDate: '2023-11-05',
    totalClaims: 3,
  },
};

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [deals, setDeals] = useState<ClaimedDeal[]>([]);
  const [loading, setLoading] = useState(true);

  const user = userId ? mockUsers[userId as keyof typeof mockUsers] : null;

  useEffect(() => {
    const fetchUserDeals = async () => {
      if (userId) {
        try {
          setLoading(true);
          const userDeals = await getClaimedDealsByUserId(userId);
          setDeals(userDeals);
        } catch (error) {
          console.error('Error fetching user deals:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDeals();
  }, [userId]);

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

  if (!user) {
    return (
      <AdminProtected>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <Button
            onClick={() => navigate('/admin')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Button>
        </div>
      </AdminProtected>
    );
  }

  return (
    <AdminProtected>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate('/admin')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail size={16} /> Email User
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Ban size={16} /> Disable Account
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>User Details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Contact Information
                </h3>
                <p className="mt-1">{user.email}</p>
                <p>{user.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Account Information
                </h3>
                <p className="mt-1">
                  Joined: {new Date(user.joinDate).toLocaleDateString()}
                </p>
                <p>Total Claims: {user.totalClaims}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Claimed Deals</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Export Data
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading user deals...</div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Restaurant</TableHead>
                  <TableHead>Deal</TableHead>
                  <TableHead>Claimed Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.length > 0 ? (
                  deals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">
                        <div
                          className="cursor-pointer hover:underline"
                          onClick={() =>
                            navigate(`/admin/restaurant/${deal.restaurantId}`)
                          }
                        >
                          {deal.restaurantName}
                        </div>
                      </TableCell>
                      <TableCell>{deal.dealTitle}</TableCell>
                      <TableCell>
                        {new Date(deal.claimedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(deal.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Mark Used
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No deals found for this user.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </AdminProtected>
  );
};

export default UserDetails;
