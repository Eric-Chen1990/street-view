"use client";
import { useEffect } from "react";

type Props = {};

const Panos = (props: Props) => {
	useEffect(() => {
		if(typeof (window as any).embedpano === 'function') {
			(window as any).embedpano({
				xml: null,
				target: "pano",
				html5: "only",
				mobilescale: 1.0,
				passQueryParameters: "startscene,startlookat",
				onready: krpanoReady,
			});
		}
	}, []);

	const krpanoReady = (krpano: any) => {
		// @ts-ignore
		window.krpano = krpano;
		loadPano();
	};

	return null;
};
const loadPano = (id: number = 1) => {
	const xml = `
        <krpano>
            <view hlookat="0.0" vlookat="0.0" fovtype="MFOV" fov="120" maxpixelzoom="2.0" fovmin="70" fovmax="140" limitview="auto" />
            <preview url="panos/pano${id}.tiles/preview.jpg" />
            <image>
                <cube url="panos/pano${id}.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg" multires="1024,1280,2048,3072" />
            </image>
        </krpano>
        `;
	// @ts-ignore
	window.krpano.call(`loadxml(${xml}, null, MERGE, BLEND(1))`);
};
export { Panos, loadPano };
