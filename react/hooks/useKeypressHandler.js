import { useEffect } from 'react';

const useKeypressHandler = (key, action) => {
	useEffect(() => {
		function onKeyup(e) {
			if (e.code === key && typeof action === 'function') action(e);
		}
		window.addEventListener('keyup', onKeyup);

		return () => {
			return window.removeEventListener('keyup', onKeyup);
		};
	}, [key, action]);
};

export default useKeypressHandler;
