import React, { useEffect, useState, useRef } from "react";

/**
 * Reference that includes <video> attributes needed for iOS Safari (as of 10/27/2021).
 */
const FeatureVideo = () => {
	const videoRef = useRef();

	const playPreview = () => {
		videoRef.current.play();
	};

	useEffect(() => {
		const registeredVideoNode = videoRef.current;

		if (registeredVideoNode) {
			registeredVideoNode.addEventListener("canplaythrough", playPreview);
		}

		return () => {
			if (registeredVideoNode) {
			registeredVideoNode.removeEventListener("canplaythrough", playPreview);
			}
		};
	}, []);

	return (
		<video
			ref={videoRef}
			controls={false}
			autoPlay
			playsInline
			muted
			loop
		>
			<source type={"video/webm"} src={`video-source.webm`} />
			<source type={"video/mp4"} src={`video-source.mp4`} />
		</video>
	);
};

export default FeatureVideo;
