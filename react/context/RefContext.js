import React, { useState } from 'react';

/**
 * Used to provide an ancestor/parent 'ref' to descendents.
 * For example, gsap scrollTrigger elements require the 'scroll container' for config,
 * which may not always be the 'window' object. So this provides a way to make the
 * container 'ref' accessible down the tree.
 * 
 * Consumer usage:
 * import { RefContext } from '../../context/RefContext';
 * 
 * const ancestorRef = useContext(RefContext);
 * 
 * Note .current may not need to be used on ancestorRef since callback ref is used in the context.
 */

const RefContext = React.createContext();

function RefContainer({classNames, children}) {
	// Used to set the ref and provide the value of it.
	// State is used in order to trigger the render once the ref has been set.
	const [ref, setRef] = useState(null);

	return (
		<RefContext.Provider value={ref}>
			<div
				ref={setRef}
				className={classNames}
			>
				{ref && children}
			</div>
		</RefContext.Provider>
	);
}

export {RefContext, RefContainer};
