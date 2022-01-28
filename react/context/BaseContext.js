import React, {createContext, useState, useContext} from 'react';

/**
 * Example Usage - Procvide
 * 
	import {ActiveSectionContextProvider} from '../context/active-section-context';
	
	function App({ Component, pageProps }) {
		return (
			<ActiveSectionContextProvider>
				<Component {...pageProps} />
			</ActiveSectionContextProvider>
		);
	}
 * Example Usage - Consume
 * 
	const { activeSection } = useActiveSectionContext();
 */

export const SomeContext = createContext();

export const useActiveSectionContext = () => { return useContext(SomeContext); };

export const SomeContextProvider = ({ children }) => {
	const [someContextState, setSomeContextState] = useState();

	return (
		<SomeContext.Provider
			value={{ activeSection, setActiveSection }}
		>
			{children}
		</SomeContext.Provider>
	);
};
