import { useEffect, useRef } from 'react';

function useIntersectionObserver(intersectHandler, config) {
	const observedRef = useRef();
	useEffect(() => {
		let observer = null;
		const ioRef = observedRef.current;
		if (ioRef) {
			/**
			 * Callback when entry is intersecting.
			 */
			const ioCb = entries => {
				entries.forEach(entry => {
					(typeof intersectHandler === 'function' && intersectHandler(entry));
				});
			};

			/**
			 * Create observer.
			 */
			observer = new IntersectionObserver(ioCb, config);

			/**
			 * Register observer.
			 */
			observer.observe(ioRef);
		}

		return () => {
			if (observer && ioRef) {
				observer.unobserve(ioRef);
			}
		};
	}, [intersectHandler, config]);

	return observedRef;
}

export default useIntersectionObserver;
