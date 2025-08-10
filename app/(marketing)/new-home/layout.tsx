/**
 * @fileoverview Layout for the enhanced home page preview
 */

export default function NewHomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
