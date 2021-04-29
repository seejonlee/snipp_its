import React, { useState } from 'react';
import classNames from 'classnames';
import MenuFoundation from './MenuFoundation';

const ns = `header-foundation`;

const HeaderFoundation = ({pathname}) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const rootClassnames = classNames({
		[`${ ns }`]: true,
	});

	const menuButtonClassnames = classNames({
		[`${ ns }__menu-button`]: true,
		[`${ ns }__menu-button--close`]: mobileMenuOpen,
	});

	const openMenuHandler = () => {
		setMobileMenuOpen(true);
	};

	const closeMenuHandler = () => {
		setMobileMenuOpen(false);
	};

	return (
		<>
			<header className={`${ rootClassnames } ${ ns }__container`}>
				<MenuFoundation
					open={mobileMenuOpen}
					onCloseCallback={closeMenuHandler}
					currentPathname={pathname}
				/>
				<div className={`${ ns }__mobile-menu-container`}>
					<button
						className={menuButtonClassnames}
						onClick={
							() => {
								if (mobileMenuOpen) {
									closeMenuHandler();
								} else {
									openMenuHandler();
								}
							}
						}
						aria-label={`Open or close menu`}
					>
						<div />
						<div />
						<div />
					</button>
				</div>
			</header>
		</>
	);
};

export default HeaderFoundation;
