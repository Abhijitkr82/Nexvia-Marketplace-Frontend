import { Search } from 'lucide-react';

// Search box with a leading icon. `focusClassName` carries the accent colour
// (e.g. "focus:border-green-500 focus:ring-green-100").
export default function SearchInput({
  value,
  onChange,
  placeholder,
  focusClassName = 'focus:border-indigo-500 focus:ring-indigo-100',
  className = 'relative mt-6',
}) {
  return (
    <div className={className}>
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:ring-2 ${focusClassName}`}
      />
    </div>
  );
}
