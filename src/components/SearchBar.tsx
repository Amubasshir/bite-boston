import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative max-w-2xl w-full">
      <Input
        type="text"
        placeholder="Search restaurants..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 py-6 text-lg rounded-full border-2 border-primary/20 focus:border-primary transition-colors outline-none"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
    </div>
  );
};
