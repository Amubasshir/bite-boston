import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { SuccessModalProvider } from './components/SuccessModal';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import RestaurantDetail from './pages/RestaurantDetail';
import AdminDashboard from './pages/admin/Dashboard';
import UserDetails from './pages/admin/UserDetails';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SuccessModalProvider>
        <Sonner />
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/restaurant/:restaurantId"
                element={<RestaurantDetail />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/user/:userId" element={<UserDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Router>
      </SuccessModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
