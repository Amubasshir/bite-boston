import { MapPin, Phone, Globe } from "lucide-react";

interface ContactInfoProps {
  address: string;
  phoneNumber: string;
  website: string;
}

export function ContactInfo({ address, phoneNumber, website }: ContactInfoProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Location & Contact</h3>
      <div className="space-y-4">
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 text-gray-400" />
          <span>{address}</span>
        </div>
        <div className="flex gap-3">
          <Phone className="h-5 w-5 text-gray-400" />
          <span>{phoneNumber}</span>
        </div>
        <div className="flex gap-3">
          <Globe className="h-5 w-5 text-gray-400" />
          <span>{website}</span>
        </div>
      </div>
    </div>
  );
}