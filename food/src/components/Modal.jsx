export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-sm font-semibold text-slate-500">Close</button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
