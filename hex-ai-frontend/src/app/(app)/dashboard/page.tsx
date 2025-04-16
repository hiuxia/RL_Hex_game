    import React from 'react';
    import UserStatsCard from '@/components/dashboard/UserStatsCard';
    import GameListTable from '@/components/dashboard/GameListTable';
    import NewGameOptions from '@/components/dashboard/NewGameOptions';

    export default function DashboardPage() {
      return (
        // Use padding defined in AppLayout or add here if needed
        <div className="p-6 space-y-6"> {/* Added space-y for vertical spacing */}
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Stats Card - Takes 1 column on medium screens */}
            <div className="md:col-span-1">
              <UserStatsCard />
            </div>
            {/* New Game Options - Takes 2 columns on medium screens */}
            <div className="md:col-span-2">
              <NewGameOptions />
            </div>
          </div>

          {/* Recent Games Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Games</h2>
            <GameListTable />
          </div>

        </div>
      );
    }
    