import React, {
	useState, useContext, useEffect
} from 'react';
import classNames from 'classnames';
import AccordionContext from './AccordionContext';

const ns = `accordion-control`;

const AccordionControl = ({
	className,
	uid,
	children,
	onClick,
}) => {
	const {
		isExpanded,
		addExpandedItems,
		removeExpandedItems,
	} = useContext(AccordionContext);

	const [expanded, setExpanded] = useState(false);

	const updateExpandedState = () => {
		if (isExpanded(uid)) {
			// Currently expanded so collapse
			removeExpandedItems(uid);
			setExpanded(false);
		} else {
			// Currently collapsed so expand
			addExpandedItems(uid);
			setExpanded(true);
		}
	};

	// Used to check if the AccordionItem was collapsed outside this component
	// because isExpanded will have updated with the new array of expandedItems.
	// i.e. from the parent 'Accordion' components collapseAll() fn.
	useEffect(() => {
		if (isExpanded(uid)) {
			setExpanded(true);
		} else {
			setExpanded(false);
		}
	}, [isExpanded, uid]);

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ ns }--expanded`]: expanded,
		[`${ className }`]: !!className,
	});

	return (
		<button
			className={rootClassnames}
			aria-controls={uid}
			aria-expanded={expanded}
			onClick={() => {
				updateExpandedState();
				(typeof onClick === 'function' && onClick());
			}}
		>
			{ children }
		</button>
	);
};

export default AccordionControl;
