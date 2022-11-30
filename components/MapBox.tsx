import React, { useState, useMemo } from "react";
import Map, {
	Marker,
	Popup,
	NavigationControl,
	FullscreenControl,
	ScaleControl,
	GeolocateControl,
} from "react-map-gl";

type Props = {};

const MapBox = (props: Props) => {
	type pointType = {
		latitude: number;
		longitude: number;
		title?: string;
		image?: string;
	};
	const geojson: pointType[] = [
		{ longitude: -122.4, latitude: 37.8, image: "./vercel.svg" },
		{ longitude: -122.0, latitude: 37.8, image: "./vercel.svg" },
		{ longitude: -122.4, latitude: 37.5, image: "./vercel.svg" },
		{ longitude: -122.4, latitude: 37.1, image: "./vercel.svg" },
	];

	const [popupInfo, setPopupInfo] = useState<pointType | null>(null);

	const pins = useMemo(
		() =>
			geojson.map((point, index) => (
				<Marker
					key={`marker-${index}`}
					longitude={point.longitude}
					latitude={point.latitude}
					anchor="bottom"
					onClick={(e) => {
						// If we let the click event propagates to the map, it will immediately close the popup
						// with `closeOnClick: true`
						e.originalEvent.stopPropagation();
						setPopupInfo(point);
					}}
				>
					<div
						style={{
							width: 20,
							height: 20,
							backgroundColor: "red",
							border: "2px solid #ffffff",
							borderRadius: "50%",
						}}
					/>
				</Marker>
			)),
		[]
	);

	return (
		<Map
			style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			initialViewState={{
				longitude: -100,
				latitude: 40,
				zoom: 3.5,
			}}
			mapStyle="mapbox://styles/mapbox/streets-v11"
		>
			<GeolocateControl position="top-left" />
			<FullscreenControl position="top-left" />
			<NavigationControl position="top-left" />
			<ScaleControl />
			{pins}
			{popupInfo && (
				<Popup
					anchor="top"
					longitude={Number(popupInfo.longitude)}
					latitude={Number(popupInfo.latitude)}
					onClose={() => setPopupInfo(null)}
				>
					<div>{popupInfo.title}</div>
					<div style={{ marginTop: 10, padding: 10 }}>
						<img width="100%" src={popupInfo.image} />
					</div>
				</Popup>
			)}
		</Map>
	);
};

export default MapBox;