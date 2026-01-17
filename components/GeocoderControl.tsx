"use client";
import { useState } from "react";
import {
	useControl,
	Marker,
	MarkerProps,
	ControlPosition,
} from "react-map-gl/mapbox";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";

const noop = () => {};

type GeocoderControlProps = Omit<
	GeocoderOptions,
	"accessToken" | "mapboxgl" | "marker"
> & {
	mapboxAccessToken: string;
	marker?: false | Omit<MarkerProps, "longitude" | "latitude">;

	position: ControlPosition;

	onLoading?: (e: object) => void;
	onResults?: (e: object) => void;
	onResult?: (e: object) => void;
	onError?: (e: object) => void;
};

/* eslint-disable complexity,max-statements */
export default function GeocoderControl(props: GeocoderControlProps) {
	const [marker, setMarker] = useState<any>(null);
	const onLoading = props.onLoading ?? noop;
	const onResults = props.onResults ?? noop;
	const onResult = props.onResult ?? noop;
	const onError = props.onError ?? noop;
	const showMarker = props.marker !== false;
	const markerProps: Omit<MarkerProps, "longitude" | "latitude"> =
		props.marker && typeof props.marker === "object" ? props.marker : {};

	const geocoder = useControl(
		() => {
			const ctrl = new MapboxGeocoder({
				...props,
				marker: false,
				accessToken: props.mapboxAccessToken,
			}) as any;
			ctrl.on("loading", onLoading);
			ctrl.on("results", onResults);
			ctrl.on("result", (evt: { result: any }) => {
				onResult(evt);

				const { result } = evt;
				const location =
					result &&
					(result.center ||
						(result.geometry?.type === "Point" && result.geometry.coordinates));
				if (location && showMarker) {
					setMarker(
						<Marker
							{...markerProps}
							longitude={location[0]}
							latitude={location[1]}
						/>
					);
				} else {
					setMarker(null);
				}
			});
			ctrl.on("error", onError);
			return ctrl;
		},
		{
			position: props.position,
		}
	);

	// @ts-ignore (TS2339) private member
	if (geocoder._map) {
		if (
			geocoder.getProximity() !== props.proximity &&
			props.proximity !== undefined
		) {
			geocoder.setProximity(props.proximity);
		}
		if (
			geocoder.getRenderFunction() !== props.render &&
			props.render !== undefined
		) {
			geocoder.setRenderFunction(props.render);
		}
		if (
			geocoder.getLanguage() !== props.language &&
			props.language !== undefined
		) {
			geocoder.setLanguage(props.language);
		}
		if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
			geocoder.setZoom(props.zoom);
		}
		if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
			geocoder.setFlyTo(props.flyTo);
		}
		if (
			geocoder.getPlaceholder() !== props.placeholder &&
			props.placeholder !== undefined
		) {
			geocoder.setPlaceholder(props.placeholder);
		}
		if (
			geocoder.getCountries() !== props.countries &&
			props.countries !== undefined
		) {
			geocoder.setCountries(props.countries);
		}
		if (geocoder.getTypes() !== props.types && props.types !== undefined) {
			geocoder.setTypes(props.types);
		}
		if (
			geocoder.getMinLength() !== props.minLength &&
			props.minLength !== undefined
		) {
			geocoder.setMinLength(props.minLength);
		}
		if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
			geocoder.setLimit(props.limit);
		}
		if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
			geocoder.setFilter(props.filter);
		}
		if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
			geocoder.setOrigin(props.origin);
		}
	}
	return marker;
}
