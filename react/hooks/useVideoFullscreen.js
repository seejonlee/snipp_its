import { useEffect } from 'react';
import screenfull from 'screenfull';

/**
 * @param {bool} enabled Conditionally adds event listeners in useEffect.
 * @param {ref} fullscreenRef Element that fullscreen gets triggered on.
 * @param {function} exitFullscreenCallback Function that gets called when fullscreen exits.
 * @returns Array of functions that enable and disable fullscreen, respectively.
 */
const useVideoFullscreen = (enabled = true, fullscreenRef, exitFullscreenCallback) => {
	const enableFullscreen = () => {
		screenfull.isEnabled && screenfull.request(fullscreenRef.current);
	};

	const disableFullscreen = () => {
		screenfull.isEnabled && screenfull.exit();
		// Needed to close fullscreen on iPhone iOS.
		fullscreenRef.current.webkitExitFullscreen && fullscreenRef.current.webkitExitFullscreen();
	};

	// Fullscreen - register listeners
	useEffect(() => {
		const handleFullscreenExit = () => {
			(typeof exitFullscreenCallback === 'function' && exitFullscreenCallback());
		};

		if (enabled) {
			if (screenfull.isEnabled) {
				screenfull.on('change', () => {
					(!screenfull.isFullscreen && handleFullscreenExit());
				});
			}

			if (fullscreenRef?.current) {
				fullscreenRef.current.addEventListener('webkitendfullscreen', handleFullscreenExit);
			}
		}

		const cleanupRef = fullscreenRef.current;

		return () => {
			if (enabled) {
				cleanupRef.removeEventListener('webkitendfullscreen', handleFullscreenExit);
			}
		};
	}, [
		fullscreenRef,
		exitFullscreenCallback,
		enabled,
	]);

	return [enableFullscreen, disableFullscreen];
};

export default useVideoFullscreen;
