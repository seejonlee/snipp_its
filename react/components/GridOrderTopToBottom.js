import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { getWindowDimensions } from '../../utils';
import useWindowEventListener from '../../utils/useWindowEventListener';

const ns = `ttb-grid`;

/**
 * The GridOrderTopToBottom component uses grid-auto-flow: column
 * to order the grid items top-to-bottom instead of left-to-right.
 * 'grid-auto-flow: column' must have the grid rows, which doesn't
 * work if you need a specific number of columns and the number of
 * grid items is unknown. So, this component figures out how many
 * rows are needed given the number of columns and grid items.
 */
const GridOrderTopToBottom = ({
	defaultColumns,
	columnsAtBreakpoints = [],
	children,
	className,
}) => {
	const [gridStyles, setGridStyles] = useState(null);
	const [windowDimensions, setWindowDimensions] = useState(null);

	useEffect(() => {
		const { width } = windowDimensions || getWindowDimensions();
		const numOfChildren = React.Children.toArray(children).length;
		let gridStyle = null;

		if (defaultColumns) {
			setGridStyles({
				display: `grid`,
				gridTemplateColumns: `repeat(${ defaultColumns.number }, ${ defaultColumns.width })`,
				// Math.ceil() on rows, otherwise certain cases would cause an extra column.
				gridTemplateRows: `repeat(${ Math.ceil(numOfChildren / defaultColumns.number) }, ${ defaultColumns.width })`,
				gridAutoFlow: `column`,
			});
		}

		if (columnsAtBreakpoints.length > 0) {
			columnsAtBreakpoints.forEach(({breakpoint, column}) => {
				if (width >= breakpoint) {
					gridStyle = {
						display: `grid`,
						gridTemplateColumns: `repeat(${ column.number }, ${ column.width })`,
						// Math.ceil() on rows, otherwise certain cases would cause an extra column.
						gridTemplateRows: `repeat(${ Math.ceil(numOfChildren / column.number) }, ${ column.width })`,
						gridAutoFlow: `column`,
					};
				}
			});
		}

		if (gridStyle) {
			setGridStyles(gridStyle);
		}
	}, [defaultColumns, columnsAtBreakpoints, children, windowDimensions]);

	useWindowEventListener('resize', () => {
		const { width } = getWindowDimensions();
		setWindowDimensions({
			width,
		});
	});

	const rootClassnames = classNames({
		[`${ ns }`]: true,
		[`${ ns }--set`]: !!gridStyles,
		[`${ className }`]: !!className,
	});

	if (!defaultColumns) return null;

	return (
		<div
			className={rootClassnames}
			style={gridStyles}
		>
			{children}
		</div>
	);
};

export default GridOrderTopToBottom;
