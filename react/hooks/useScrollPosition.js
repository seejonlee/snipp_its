import React from 'react';

/**
 * Example Usage:
 * 	const handlerThatReceivesPositions = useCallback(positions => {
		if (positions.y < prevWindowY.current) {
			headerRef.current.classList.remove('banner--hidden');
		} else if (positions.y >= 40) {
			headerRef.current.classList.add('banner--hidden');
		}

		prevWindowY.current = positions.y;
	}, []);

	useScrollPosition(handlerThatReceivesPositions, someBooleanFlag);
 */
const useScrollPosition = (callback, enable) => {
	const handleScroll = React.useCallback(() => {
		const getScrollPosition = () => {
			if (window) {
				return {
					x: window.scrollX,
					y: window.scrollY,
				};
			}

			return {
				x: 0,
				y: 0,
			};
		};

		const positions = getScrollPosition();

		(typeof callback === 'function' && callback(positions));
	}, [callback]);

	React.useLayoutEffect(() => {
		enable && window.addEventListener('scroll', handleScroll);

		return () => {
			enable && window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll, enable]);
};

export default useScrollPosition;
