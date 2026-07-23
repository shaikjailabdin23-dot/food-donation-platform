export default function SearchBar({ value, onChange, placeholder = 'Search donations' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-sm outline-none"
      />
    </div>
  )
}
