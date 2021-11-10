/**
 * When using transparent video returns true if the browser supports HEVC Alpha codec to
 * help set the video source to .mov or .webm otherwise.
 * @returns boolean True if browser supports HEVC alpha codec i.e. Safari
 */
export const supportsHEVCAlpha = () => {
	const { navigator } = getSafeWindowObject();
	const ua = navigator.userAgent.toLowerCase();
	const hasMediaCapabilities = !!(
		navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
	);
	const isSafari =
		ua.indexOf('safari') !== -1 &&
		!(ua.indexOf('chrome') !== -1) &&
		ua.indexOf('version/') !== -1;
	return isSafari && hasMediaCapabilities;
	};

export const getMobileOS = () => {
	const { navigator } = getSafeWindowObject();
	const ua = navigator.userAgent;

	if (/android/i.test(ua)) {
		return 'Android';
	}
	if (
		/iPad|iPhone|iPod/.test(ua) ||
		(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
	) {
		return 'iOS';
	}

	return null;
};

/**
 * Original source: https://codepen.io/Maltsbier/pen/dyYmGGq
 * @param {scrolled element} bound Element containing the scroll area.
 * @param {*} onPercentScrolledCallback Optional callback that receives the percent scrolled.
 */
export const registerScrollTransition = (bound, onPercentScrolledCallback) => {
	let rafId;

	const scrollTransition = () => {
		if (bound) {
		const distanceFromTop =
			window.scrollY + bound.getBoundingClientRect().top;
		const rawPercentScrolled =
			(window.scrollY - distanceFromTop) /
			(bound.scrollHeight - window.innerHeight);
		const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);

		if (typeof onPercentScrolledCallback === 'function')
			onPercentScrolledCallback(percentScrolled);
		}

		if (rafId) cancelAnimationFrame(rafId);

		rafId = requestAnimationFrame(scrollTransition);
	};

	requestAnimationFrame(scrollTransition);
};

/**
 * Calculates parameters that may be used to pass to Canvas.drawImage() when
 * the image needs to be scaled to fit the dimensions of the canvas element.
 * @param {element} canvas HTML Canvas element.
 * @param {element} image HTML Image element.
 * @returns Object with x, y, scale parameters that may be used in Canvas.drawImage(image, x, y, image.width * scale, image.height * scale);
 */
const getCanvasImageScaleParameters = (canvas, image) => {
	const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
	const x = (canvas.width / 2) - (image.width / 2) * scale;
	const y = (canvas.height / 2) - (image.height / 2) * scale;

	return {
		x,
		y,
		scale
	};
};
