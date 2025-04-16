"use client"; // Forms typically need client components for state

import React, { useState } from "react";

interface UserProfileFormProps {
	// Props for initial data, e.g., initialUsername: string;
}

const UserProfileForm: React.FC<UserProfileFormProps> = () => {
	// Example state for form fields
	const [username, setUsername] = useState("CurrentUser"); // Replace with actual data later
	const [email, setEmail] = useState("user@example.com"); // Replace with actual data later

	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email (Read-only example)
				</label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					readOnly // Example: Email might not be editable
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
				/>
			</div>
			{/* Add Avatar upload/display later */}
		</div>
	);
};

export default UserProfileForm;
