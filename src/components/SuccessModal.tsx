import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
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
              <h2 className="text-xl font-bold mb-4">
                Deal Claimed Successfully!
              </h2>
              <div className="space-y-2">
                <p>Your confirmation ID is:</p>
                <p className="text-lg font-bold text-primary">
                  {modalData.confirmationId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your deal has been reserved for{' '}
                  {modalData.selectedDate
                    ? format(modalData.selectedDate, 'PPP')
                    : 'the selected date'}
                  .
                </p>
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
