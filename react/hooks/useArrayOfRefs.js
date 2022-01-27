import { useRef } from 'react';

/**
 * Usage:
 * const [arrayOfRefs, refCallback] = useArrayOfRefs(someLength);
 * 
 * Within a .map (since this would most likely correspond with some array of data your component maps over):
 * ref={(el) => { refCallback(el, index); }}
 */
const useArrayOfRefs = (size) => {
	const arrayOfRefs = useRef(new Array(size));

	const refCallback = (el, index) => {
		if (arrayOfRefs.current) {
		arrayOfRefs.current[index] = el;
		}
	};

	return [arrayOfRefs, refCallback];
};

export default useArrayOfRefs;
