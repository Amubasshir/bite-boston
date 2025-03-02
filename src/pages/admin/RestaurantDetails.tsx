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
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ClaimedDeal, getClaimedDealsByRestaurantId } from '@/lib/mockData';
import { ArrowLeft, Ban, Download, Mail, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock restaurant data
const mockRestaurants = {
  '1': {
    id: '1',
    name: 'Burger Palace',
    address: '123 Main St, Boston, MA',
    phone: '(617) 555-1234',
    email: 'contact@burgerpalace.com',
    totalDeals: 3,
    activeDeals: 2,
    totalClaims: 45,
  },
  '2': {
    id: '2',
    name: 'Pizza Heaven',
    address: '456 Elm St, Boston, MA',
    phone: '(617) 555-5678',
    email: 'info@pizzaheaven.com',
    totalDeals: 2,
    activeDeals: 1,
    totalClaims: 32,
  },
  '3': {
    id: '3',
    name: 'Sushi Delight',
    address: '789 Oak St, Boston, MA',
    phone: '(617) 555-9012',
    email: 'hello@sushidelight.com',
    totalDeals: 4,
    activeDeals: 3,
    totalClaims: 67,
  },
};

const RestaurantDetails = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [deals, setDeals] = useState<ClaimedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const restaurant = restaurantId
    ? mockRestaurants[restaurantId as keyof typeof mockRestaurants]
    : null;

  useEffect(() => {
    const fetchDeals = async () => {
      if (restaurantId) {
        try {
          setLoading(true);
          const restaurantDeals = await getClaimedDealsByRestaurantId(
            restaurantId
          );
          setDeals(restaurantDeals);
        } catch (error) {
          console.error('Error fetching restaurant deals:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDeals();
  }, [restaurantId]);

  const filteredDeals = deals.filter(
    (deal) =>
      deal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.dealTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (!restaurant) {
    return (
      <AdminProtected>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Restaurant Not Found</h1>
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
              <Mail size={16} /> Contact Restaurant
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Ban size={16} /> Disable Restaurant
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{restaurant.name}</CardTitle>
            <CardDescription>Restaurant Details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Contact Information
                </h3>
                <p className="mt-1">{restaurant.address}</p>
                <p>{restaurant.phone}</p>
                <p>{restaurant.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Deal Statistics
                </h3>
                <p className="mt-1">Total Deals: {restaurant.totalDeals}</p>
                <p>Active Deals: {restaurant.activeDeals}</p>
                <p>Total Claims: {restaurant.totalClaims}</p>
              </div>
              <div className="flex justify-end items-start">
                <Button className="flex items-center gap-2">
                  <Plus size={16} /> Add New Deal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Claimed Deals</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search by user or deal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} /> Export Data
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading restaurant deals...</div>
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
                  filteredDeals.map((deal) => (
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
                      No deals found for this restaurant.
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

export default RestaurantDetails;
