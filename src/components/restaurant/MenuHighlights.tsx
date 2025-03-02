interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuHighlightsProps {
  items: MenuItem[];
}

export function MenuHighlights({ items }: MenuHighlightsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Menu Highlights</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-primary">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <span className="text-gray-900">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}