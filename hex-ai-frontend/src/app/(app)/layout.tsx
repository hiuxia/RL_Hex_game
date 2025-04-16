import SidebarNav from '@/components/ui/SideBarNav'; // Adjust path if needed
import React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Main container using flexbox to position sidebar and content
    <div className="flex h-screen overflow-hidden bg-gray-100"> {/* Base light background */}

      {/* Persistent Sidebar */}
      <SidebarNav />

      {/* Main content area */}
      {/* flex-1 allows it to take remaining width */}
      {/* overflow-y-auto enables scrolling ONLY for the content area */}
      <main className="flex-1 overflow-y-auto">
        {/* Page content from dashboard/page.tsx, game/page.tsx etc. renders here */}
        {children}
      </main>

    </div>
  );
}

