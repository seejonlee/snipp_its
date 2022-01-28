import { useEffect, useRef } from 'react';

/**
 * Example Usage:

	const topEntryRef = useIntersectionObserver(entry => {
		console.log(entry.isIntersecting);
	}, {
		rootMargin: '10% 0% -60% 0%'
	});

	Example component to use as an observed element for cases where an existing element is undesirable.
	import React, {forwardRef} from 'react';

	const IntersectionObserverPixel = (className, ref) => {
		return (
			<span
				style={{
					width: '1px',
					height: '1px',
					visibility: 'hidden',
				}}
				ref={ref}
			/>
		);
	};

	export default forwardRef(IntersectionObserverPixel);
 */
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
