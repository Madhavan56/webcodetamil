import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { router } from '@/routes';

const AppContent = () => {
  const { toasts, dismiss } = useToast();

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
};

export default function App() {
  return <AppContent />;
}