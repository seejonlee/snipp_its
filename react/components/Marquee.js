import React from 'react';
import classNames from 'classnames';

const ns = `marquee`;

const Marquee = ({children, animationDuration, animationDirection = 'rtl'}) => {
	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ ns }--ltr`]: animationDirection === 'ltr',
	});

	if (!children) return null;

	return (
		<div className={rootClassnames}>
			<div className={`${ ns }__content`} style={{animationDuration}}>
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
