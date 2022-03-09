import React, {createContext, useState, useContext} from 'react';

/**
 * Example Usage - Provider
 * 
	import {ActiveSectionContextProvider} from '../context/active-section-context';
	
	function App({ Component, pageProps }) {
		return (
			<ActiveSectionContextProvider>
				<Component {...pageProps} />
			</ActiveSectionContextProvider>
		);
	}
 * Example Usage - Consumer
 * 
	const { activeSection } = useActiveSectionContext();
 */

export const SomeContext = createContext();

export const useActiveSectionContext = () => { return useContext(SomeContext); };

export const SomeContextProvider = ({ children }) => {
	const [someContextState, setSomeContextState] = useState();

	// Any other logic and functionality.

	return (
		<SomeContext.Provider
			value={{ someContextState, setSomeContextState }}
		>
			{children}
		</SomeContext.Provider>
	);
};
