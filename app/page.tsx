"use client";

import MapBox from "../components/MapBox";
import styles from "../styles/Home.module.css";
import { Panos } from "../components/Panos";
import Switcher from "../components/Switcher";
import { useAppStore } from "../stores";
import { MapProvider } from "react-map-gl/mapbox";

export default function Home() {
	const mainPano = useAppStore((state) => state.mainPano);
	return (
		<MapProvider>
			<div className={styles.container}>
				<main className={styles.main}>
					<div id="map" className={mainPano ? styles.area : styles.full}>
						<MapBox />
					</div>
					<div id="pano" className={!mainPano ? styles.area : styles.full}>
						<Panos />
					</div>
					<Switcher />
				</main>
			</div>
		</MapProvider>
	);
}
