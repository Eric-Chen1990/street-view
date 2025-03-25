import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
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
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
