import React, {
	useCallback,
	useEffect,
	useRef,
	useImperativeHandle
} from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

const ns = `fade-group`;

/**
 * Component using useImperativeHandle
 * ***********************************
 * This component provides and API for the parent to call a function to initiate the fadeIn, fadeOut,
 * and FadeInOut. FadeInOut has an option to execute it's own functionality in between the fade-in and fade-out.
 * i.e. If it needs to update state that is also rendered in the UI and wants to visually fade the transition
 * between the rendering of the previous and new state.
 *
 * TODO:
 * This could be refactored further to be more robust.
 * Need to think of use-cases and how this component would be designed differently.
 * 
 * @param {number in milliseconds} timeout
 * @param {forwardedRef} ref Ref used so the Parent can call FadeInOut function.
 * @returns Wrapper component that visually fades it's children.
 */
const FadeGroup = ({
	children,
	timeout = 500,
}, ref) => {
	const targetRef = useRef(ref);
	const timeline = useRef();

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const fadeOut = useCallback(() => {
		timeline.current.to(targetRef.current, {opacity: 0, duration: (timeout / 1000)});
	}, [timeout]);

	const fadeIn = useCallback(() => {
		timeline.current.to(targetRef.current, {opacity: 1, delay: (timeout / 1000)});
	}, [timeout]);

	const fadeInOut = fadeAction => {
		fadeOut();
		if (typeof fadeAction === 'function') {
			setTimeout(() => { fadeAction(); }, timeout);
		}
		fadeIn();
	};

	useEffect(() => {
		timeline.current = gsap.timeline();

		return (() => {
			(typeof timeline.current.kill === 'function' && timeline.current.kill());
		});
	}, []);

	useImperativeHandle(ref, () => {
		return ({
			fadeInOut: fadeAction => {
				fadeInOut(fadeAction);
			},
			fadeIn: () => {
				fadeIn();
			},
			fadeOut: () => {
				fadeOut();
			},
		});
	});

	return (
		<div ref={targetRef} className={rootClassnames} style={{ display: 'inline-block' }}>
			{children}
		</div>
	);
};

export default React.forwardRef(FadeGroup);
