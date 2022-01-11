import { useRef } from 'react';

/**
 * Hook that returns an object of refs and the corresponding ref callback
 * that sets the ref in the object.
 * Object is used, as opposed to an array, for quicker lookup.
 */
const useStorageOfRefs = () => {
	const refsStorage = useRef({}); // Object to control the video players.

	const setInRefsStorage = (node, key) => {
		/**
		 * Keep references to elements as object properties.
		 */
		refsStorage.current[key] = node;
	};

	/**
	 * Usage Example to store the ref:
	 * ref={node => {
			setInRefsStorage(node, _index);
		}}
	 * Usage Example to use the ref:
	 * if (refsStorage.current[someKey]) {
			refsStorage.current[someKey].someFunction();
		}
	 */
	return {
		setInRefsStorage,
		refsStorage,
	};
};

export default useStorageOfRefs;
