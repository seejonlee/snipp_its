import React, {
	useState, useRef, useContext, useEffect
} from 'react';
import classNames from 'classnames';
import AccordionContext from './AccordionContext';

const ns = `accordion-panel`;

const AccordionPanel = ({
	className,
	uid,
	render,
	children,
	initialContentHeight = '0px',
}) => {
	const {isExpanded} = useContext(AccordionContext);

	const [expanded, setExpanded] = useState(false);
	const [contentHeight, setContentHeight] = useState(initialContentHeight);

	const expandPanel = useRef(null);

	useEffect(() => {
		if (isExpanded(uid)) {
			setExpanded(true);
			setContentHeight(`${ expandPanel.current.scrollHeight }px`);
		} else {
			setExpanded(false);
			setContentHeight(initialContentHeight);
		}
	}, [isExpanded, uid, initialContentHeight]);

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ className }`]: !!className,
	});

	return (
		<div className={rootClassnames}>
			<div
				className={`${ ns }__content`}
				style={{maxHeight: `${ contentHeight }`}}
				id={uid}
				ref={expandPanel}
			>
				<div className={`${ ns }__content-body`}>
					{
						(typeof render === 'function') && render(expanded)
					}
					{
						!render && children
					}
				</div>
			</div>
		</div>
	);
};

export default AccordionPanel;
