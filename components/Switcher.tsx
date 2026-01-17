
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useAppStore } from "../stores";
import { useMap } from "react-map-gl/mapbox";
type Props = {};

const Switcher = (props: Props) => {
	const {mainPano, switchView} = useAppStore();
	const { mapBox } = useMap();
	const handleSwitch = () => {
		switchView();
	};
	useEffect(() => {
		mapBox?.resize();
	}, [mainPano, mapBox]);
	return (
		<div className={styles.switcher} onClick={handleSwitch}>
			Main {mainPano ? "pano" : "map"} view
		</div>
	);
};

export default Switcher;
