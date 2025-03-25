import Image from "next/image";
import React, { useState, useMemo } from "react";
import Map, {
	Marker,
	Popup,
	NavigationControl,
	FullscreenControl,
	ScaleControl,
	GeolocateControl,
} from "react-map-gl/mapbox";
import GeocoderControl from "./GeocoderControl";
import { loadPano } from "./Panos";
type Props = {};

const MapBox = (props: Props) => {
	type pointType = {
		latitude: number;
		longitude: number;
		title?: string;
		id: number;
	};
	const geojson = useMemo<pointType[]>(
		() => [
			{ longitude: -122.4, latitude: 37.8, id: 1 },
			{ longitude: -122.0, latitude: 37.8, id: 2 },
			{ longitude: -122.4, latitude: 37.5, id: 3 },
			{ longitude: -122.4, latitude: 37.1, id: 4 },
		],
		[]
	);

	const [popupInfo, setPopupInfo] = useState<pointType | null>(null);
	const [active, setActive] = useState<number | null>(null);

	const changePano = (id: number) => {
		setActive(id);
		loadPano(id);
	};

	const pins = useMemo(
		() =>
			geojson.map((point) => (
				<Marker
					key={`marker-${point.id}`}
					longitude={point.longitude}
					latitude={point.latitude}
					anchor="center"
					onClick={(e) => {
						// If we let the click event propagates to the map, it will immediately close the popup
						// with `closeOnClick: true`
						e.originalEvent.stopPropagation();
						setPopupInfo(point);
					}}
				>
					<div
						style={{
							width: 16,
							height: 16,
							backgroundColor: active === point.id ? "red" : "green",
							border: "3px solid #ffffff",
							borderRadius: "50%",
						}}
						onClick={() => changePano(point.id)}
					/>
				</Marker>
			)),
		[geojson, active]
	);

	return (
		<Map
			style={{
				height: "100%",
				width: "100%",
			}}
			id="mapBox"
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			initialViewState={{
				longitude: -122.4,
				latitude: 37.8,
				zoom: 5.5,
			}}
			mapStyle="mapbox://styles/mapbox/streets-v11"
		>
			<GeolocateControl position="top-left" />
			<FullscreenControl position="top-left" />
			<NavigationControl position="top-left" />
			<GeocoderControl
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
				position="top-right"
			/>

			<ScaleControl />
			{pins}
			{popupInfo && (
				<Popup
					anchor="bottom"
					longitude={Number(popupInfo.longitude)}
					latitude={Number(popupInfo.latitude)}
					onClose={() => setPopupInfo(null)}
				>
					<div>{popupInfo.title}</div>
					<div style={{ marginTop: 10, padding: "0 5" }}>
						<Image
							width={120}
							height={120}
							quality={8}
							src={`/panos/pano${popupInfo.id}.tiles/thumb.jpg`}
							alt={popupInfo.title || ""}
						/>
					</div>
				</Popup>
			)}
		</Map>
	);
};

export default MapBox;
