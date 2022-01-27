import { useRef } from 'react';

const useLockScroll = () => {
	const lockScrollPosition = useRef();

	const disableScroll = () => {
		const body = document.querySelector('body');

		lockScrollPosition.current = window?.pageYOffset;
		body.style.overflow = `hidden`;
		body.style.position = `fixed`;
		body.style.width = `100%`;
		body.style.top = `-${ lockScrollPosition.current }px`;
	};

	const enableScroll = () => {
		const body = document.querySelector('body');

		body.style.removeProperty('overflow');
		body.style.removeProperty('position');
		body.style.removeProperty('top');
		body.style.removeProperty('width');
		window?.scrollTo(0, lockScrollPosition.current);
	};

	return {
		disableScroll,
		enableScroll,
	};
};

export default useLockScroll;
