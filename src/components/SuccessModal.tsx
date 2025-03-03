import { Button } from '@/components/ui/button';
import { createContext, ReactNode, useContext, useState } from 'react';

// Define the modal data type
interface SuccessModalData {
  selectedDate: Date;
  confirmationId: string;
  user_id: string;
  email: string;
  restaurant_name: string;
  restaurant_id: string;
  deal_title: string;
  deal_description: string;
  expiry_date: Date;
  claimed_at: Date;
}

// Create a context for the modal
interface SuccessModalContextType {
  showSuccessModal: (data: SuccessModalData) => void;
  hideSuccessModal: () => void;
}

const SuccessModalContext = createContext<SuccessModalContextType | undefined>(
  undefined
);

// Provider component
export function SuccessModalProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState<SuccessModalData | null>(null);

  const showSuccessModal = (data: SuccessModalData) => {
    setModalData(data);
    setIsVisible(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const hideSuccessModal = () => {
    setIsVisible(false);
    document.body.style.overflow = ''; // Restore scrolling
  };

  return (
    <SuccessModalContext.Provider
      value={{ showSuccessModal, hideSuccessModal }}
    >
      {children}

      {/* Modal */}
      {isVisible && modalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="mb-6">
              <h2 className="text-xl text-center font-bold mb-4">
                🎉 Deal Confirmed! 🎉
              </h2>
              <div className="space-y-3">
                <p>Nice! You just redeemed a deal! 🎊</p>
                <p>
                  You'll receive an email confirmation shortly with your deal
                  details and instructions on how to redeem it at the
                  restaurant.
                </p>
                <p className="text-sm rounded-md">
                  📌 Important: You may still need to make a reservation with
                  the restaurant to secure your preferred dining time.
                </p>
                <p>Bon appétit & enjoy your meal!</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={hideSuccessModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </SuccessModalContext.Provider>
  );
}

// Hook to use the modal
export function useSuccessModal() {
  const context = useContext(SuccessModalContext);
  if (context === undefined) {
    throw new Error(
      'useSuccessModal must be used within a SuccessModalProvider'
    );
  }
  return context;
}
