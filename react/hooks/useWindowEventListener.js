import { useEffect } from 'react';

const useWindowEventListener = (windowEvent, handlerCallback, useCapture = false) => {
	useEffect(() => {
		window.addEventListener(windowEvent, handlerCallback, useCapture);

		return () => {
			window.removeEventListener(windowEvent, handlerCallback, useCapture);
		};
	}, [windowEvent, handlerCallback, useCapture]);
};

export default useWindowEventListener;
