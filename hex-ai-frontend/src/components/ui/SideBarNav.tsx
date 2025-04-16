'use client'; // Needs to be a client component to use usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // Import React

// Example icons, you might need different ones
import {
  HomeIcon, // For Dashboard
  // PuzzlePieceIcon, // For Game - REMOVED
  PlayCircleIcon, // For Replay (If added later)
  Cog6ToothIcon, // For Settings
  // QuestionMarkCircleIcon // Placeholder for other links
} from '@heroicons/react/24/outline';


// Define navigation items
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  // { name: 'Game', href: '/game', icon: PuzzlePieceIcon }, // <-- REMOVED THIS LINE
  // Add Replay link later if needed, maybe points to a list first
  // { name: 'Replays', href: '/replays', icon: PlayCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

// Helper function to apply conditional classes
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col">
      {/* Logo/Brand Area */}
      <div className="mb-8 flex items-center justify-center h-16">
        {/* You can replace this with an actual logo component or image */}
        <span className="text-2xl font-bold text-white">Hex AI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              // Basic active check: true if pathname starts with item.href
              // More specific checks might be needed (e.g., exact match for dashboard)
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out'
            )}
            aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                pathname.startsWith(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                'mr-3 flex-shrink-0 h-5 w-5' // Adjusted icon size slightly
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Optional: User Profile/Logout section at bottom */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        {/* Placeholder for user info/logout */}
        <p className="text-xs text-gray-400 text-center">User Actions Area</p>
      </div>
    </aside>
  );
}

