interface FeatureCheckItem {
  label: string;
  description?: string;
}

interface FeatureCheckListProps {
  items: FeatureCheckItem[];
  color?: string;
}

export function FeatureCheckList({ items }: FeatureCheckListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700 text-[15px]">
          {item.description ? (
            <><strong>{item.label}:</strong> {item.description}</>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  );
}
