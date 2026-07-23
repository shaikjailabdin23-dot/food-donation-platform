export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-10 text-slate-300 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">FoodBridge</p>
          <p className="mt-2 max-w-xl text-sm">Connecting donors, NGOs, and communities to reduce waste and feed people with dignity.</p>
        </div>
        <div className="text-sm">
          <p>hello@foodbridge.org</p>
          <p className="mt-1">© 2026 FoodBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
