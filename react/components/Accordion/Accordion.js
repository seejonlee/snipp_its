import React, { useImperativeHandle, useState } from 'react';
import classNames from 'classnames';
import AccordionContext from './AccordionContext';

const ns = `accordion`;

/**
 * @prop {array} preExpanded Requires passing same respective value(s)
 *  to the 'uid' prop in the corresponding AccordionItem(s).
 * <Accordion
 * 	preExpanded={[keyedItems[0].key]}
 * >
 * 		<AccordionItem
 * 			uid={key}
 * 		>
 * 		...
 * @prop {bool} allowMultipleExpanded Default is false. If true will allow multiple
 * AccordionPanels to be expanded at one time. Otherwise, when a collapsed AccordionControl
 * is clicked, any existing expanded one will close.
 */
const Accordion = ({
	children, className, preExpanded, allowMultipleExpanded,
}, ref) => {
	const [expandedItems, setExpandedItems] = useState(
		(preExpanded && preExpanded.length)
			? preExpanded
			: []
	);

	useImperativeHandle(ref, () => {
		return {
			collapseAll: () => {
				setExpandedItems([]);
			},
		};
	});

	const addExpandedItems = id => {
		if (allowMultipleExpanded) {
			setExpandedItems(prev => {
				return prev.concat(id);
			});
		} else {
			setExpandedItems([id]);
		}
	};

	const removeExpandedItems = id => {
		setExpandedItems(prev => {
			return prev.filter(item => {
				return item !== id;
			});
		});
	};

	const isExpanded = id => {
		return expandedItems.includes(id);
	};

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ className }`]: !!className,
	});

	return (
		<AccordionContext.Provider
			value={{
				expandedItems,
				isExpanded,
				addExpandedItems,
				removeExpandedItems,
			}}
		>
			<div className={rootClassnames}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
};

export default React.forwardRef(Accordion);
