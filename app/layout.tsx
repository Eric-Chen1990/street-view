import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: "Street View",
	description: "Street view demo",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{/* Mapbox stylesheets */}
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
					type="text/css"
				/>
				<script src="/tour.js" async></script>
			</head>
			<body>{children}</body>
		</html>
	);
}
