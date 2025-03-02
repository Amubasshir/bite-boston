interface HoursSectionProps {
  hours: Record<string, string>;
}

export function HoursSection({ hours }: HoursSectionProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Hours</h2>
      <div className="space-y-2">
        {Object.entries(hours).map(([days, hours]) => (
          <div key={days} className="flex justify-between">
            <span className="text-gray-600">{days}</span>
            <span className="text-gray-900">{hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}