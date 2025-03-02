import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="top-right"
      expand
      visibleToasts={1}
      closeButton
      className="toaster"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'rounded-lg p-4 shadow-lg text-white',
          title: 'font-semibold',
          description: 'text-sm',
          success: 'bg-green-600',
          error: 'bg-red-500',
          loader: 'bg-zinc-200',
          closeButton:
            'absolute right-2 top-2 opacity-70 transition hover:opacity-100',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
