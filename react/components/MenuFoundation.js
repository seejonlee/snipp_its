import React from 'react';
import classNames from 'classnames';
import useKeypressHandler from '../../utils/hooks/useKeypressHandler';

const ns = `menu-foundation`;

const MenuFoundation = ({
	onCloseCallback, open = false, currentPathname,
}) => {
	useKeypressHandler('Escape', onCloseCallback);

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ ns }--closed`]: !open,
	});

	return (
		<div className={rootClassnames}>
			<div
				className={`${ ns }__content`}
			>
				<p>Menu Content</p>
				<p>{`Active page is ${ currentPathname }`}</p>
			</div>
		</div>
	);
};

export default MenuFoundation;
