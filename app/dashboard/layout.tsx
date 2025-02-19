export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
        {children}
      </div>
    )
  }