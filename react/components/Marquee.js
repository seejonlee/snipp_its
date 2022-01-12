import React from 'react';
import classNames from 'classnames';

const ns = `marquee`;

const Marquee = ({children}) => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	if (!children) return null;

	return (
		<div className={rootClassnames}>
			<div className={`${ ns }__content`}>
				<div className={`${ ns }__content-block`}>
					{children}
				</div>
				<div className={`${ ns }__content-block`}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Marquee;
