import React, { useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'uniqid';

const ns = `accordion-item`;

const AccordionItem = ({
	className,
	children,
	uid,
}) => {
	// ID used to connect AccordionControl and respective AccordionPanel.
	// The value for the uid prop may be set explicitely for cases where 'preExpanded' is used
	// on the 'Accordion' component because in that case the uid must be known
	// ahead of time in order to specify which AccordionItems will be preExpanded.
	// Otherwise, a value will be created here.
	const [relationshipId] = useState(() => {
		return uid || uniqueId('accordion-item-');
	});

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ className }`]: !!className,
	});

	return (
		<div className={rootClassnames}>
			{
				// Implicitely add the uid prop to AccordionItem's children, which
				// is used to relate the AccordionControl and AccordionPanel.
				React.Children.map(children, child => {
					return React.cloneElement(child, {
						uid: relationshipId,
					});
				})
			}
		</div>
	);
};

export default AccordionItem;
