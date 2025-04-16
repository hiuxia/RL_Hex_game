"use client";
// Note: No 'use client' needed here if form state is managed within child components
import React from "react";
import UserProfileForm from "@/components/settings/UserProfileForm";
import ThemeSelector from "@/components/settings/ThemeSelector";
import GameOptionToggles from "@/components/settings/GameOptionToggles";

export default function SettingsPage() {
	// TODO: Add handler for form submission
	const handleSaveSettings = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Saving settings... (API call needed)");
		// Gather data from form state (likely managed within child components or lifted up)
		alert("Saving settings... (Not implemented)");
	};

	return (
		// Use padding defined in AppLayout or add here
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">
				Settings
			</h1>

			{/* Form element wraps all settings sections */}
			<form
				className="bg-white p-6 rounded-lg shadow space-y-8"
				onSubmit={handleSaveSettings}
			>
				{/* Profile Section */}
				<section aria-labelledby="profile-heading">
					<h2
						id="profile-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Profile
					</h2>
					<UserProfileForm />
				</section>

				{/* Appearance Section */}
				<section aria-labelledby="appearance-heading">
					<h2
						id="appearance-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Appearance
					</h2>
					<ThemeSelector />
				</section>

				{/* Gameplay Section */}
				<section aria-labelledby="gameplay-heading">
					<h2
						id="gameplay-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Gameplay
					</h2>
					<GameOptionToggles />
				</section>

				{/* Save Button */}
				<div className="pt-4 border-t border-gray-200">
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Save Settings
					</button>
				</div>
			</form>
		</div>
	);
}
