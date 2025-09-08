import React from "react";

const ThemeSuspense = () => {
	return (
		<div className="flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900">
			<div className="flex flex-col items-center gap-6">
				{/* Snake Tail Loader */}
				<svg className="w-12 h-12 animate-spin-slow" viewBox="25 25 50 50">
					<circle
						className="loader-path"
						cx="50"
						cy="50"
						r="20"
						fill="none"
						strokeWidth="4"
						strokeMiterlimit="10"
					/>
				</svg>

				{/* Loading Text */}
				<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
					Loading...
				</p>
			</div>
		</div>
	);
};

export default ThemeSuspense;
