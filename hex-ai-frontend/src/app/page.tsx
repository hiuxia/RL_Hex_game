// Using redirect requires this page to be a Client Component or used in Server Actions
// Let's make it a simple Client Component for redirection
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for client-side redirect

export default function RootPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the dashboard page on component mount
		router.replace("/dashboard");
	}, [router]);

	// Optionally render a loading state or minimal content while redirecting
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<p className="text-gray-600">Loading Hex AI...</p>
			{/* Or a spinner component */}
		</div>
	);

	// Alternative using Next.js redirect function (works on server):
	// import { redirect } from 'next/navigation';
	// export default function RootPage() {
	//   redirect('/dashboard');
	// }
}
