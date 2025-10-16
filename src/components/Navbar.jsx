import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const noop = () => {};

const getItemClasses = (isActive) =>
	[
		"px-3",
		"py-2",
		"text-sm",
		"font-medium",
		"rounded-full",
		isActive
			? "bg-indigo-600 text-white shadow-md"
			: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
	].join(" ");

export default function Navbar({
	items = [],
	isDarkMode = false,
	onToggleTheme = noop,
	activeId,
}) {
	const location = useLocation();

	const isActive = (item) => {
		if (activeId) {
			return activeId === item.id;
		}
		if (item.type === "route" && item.to) {
			if (item.to === "/") {
				return location.pathname === "/";
			}
			return location.pathname.startsWith(item.to);
		}
		if (item.type === "anchor" && item.href) {
			return location.hash === item.href;
		}
		return false;
	};

	return (
		<header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200 dark:bg-gray-950/80 dark:border-gray-800">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link to="/" className="text-lg font-semibold text-gray-900 dark:text-white">
					AIAI
				</Link>
				<nav className="flex items-center gap-3">
					{items.map((item) => {
						const active = isActive(item);

						if (item.type === "anchor") {
							return (
								<a
									key={item.id}
									href={item.href}
									className={getItemClasses(active)}>
									{item.label}
								</a>
							);
						}

						return (
							<Link key={item.id} to={item.to} className={getItemClasses(active)}>
								{item.label}
							</Link>
						);
					})}
					<button
						type="button"
						onClick={onToggleTheme}
						className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-500 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white"
						aria-label="Toggle dark mode">
						{isDarkMode ? (
							<Moon className="h-4 w-4" />
						) : (
							<Sun className="h-4 w-4" />
						)}
					</button>
				</nav>
			</div>
		</header>
	);
}
