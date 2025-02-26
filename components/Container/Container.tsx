import React from 'react'
import styles from './Container.module.css';
import clsx from 'clsx';

function Container({children, size, type, space_top, grid, centered}: {children: React.ReactElement; 
	size?: 'sm' | 'md' | 'lg'; type: 'div' | 'section'; space_top?: boolean; grid?: boolean; centered? :boolean }) {
	return type === 'section' ? 
		(
			<section className={clsx(styles.container, size && styles[size], space_top && styles.space_top, centered && styles.centered)}>{children}</section>
				) : 
		(
			<div className={clsx(styles.container, size && styles[size], grid && styles.grid)}>
				{children}
			</div>
		)
}

export default Container