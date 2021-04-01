import {useEffect, useRef} from 'react';

function useScrollTo(scrollTo) {
	const scrollToRef = useRef();

	useEffect(() => {
		if (scrollTo && scrollToRef.current) {
			scrollToRef.current.scrollIntoView({behavior: 'smooth'});
		}
	}, [scrollTo, scrollToRef]);

	return scrollToRef;
}

export default useScrollTo;
