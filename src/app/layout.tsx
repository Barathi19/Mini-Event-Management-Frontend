import { Navbar } from "@/components/layout/navbar";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Mini Event Management",
  description:
    "A simple event management app built with Next.js, Tailwind CSS, and Shadcn UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Top Navigation */}
        <header className="border-b bg-card shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-primary">Event Manager</h1>
            <Navbar />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          {children}
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
