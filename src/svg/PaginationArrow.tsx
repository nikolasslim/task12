import React from 'react';
import type { SvgProps } from '@/interfaces/UI';
import type { FC } from 'react';

const Arrow: FC<SvgProps> = ({ className = '', width, height, ...props }) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox="0 15.5 23.709999084472656 24.25"
			data-asc="0.9052734375"
			{...props}
		>
			<defs />
			<g fill="#000000">
				<g transform="translate(0, 0)">
					<path d="M0 29.61L0 25.51L23.71 15.50L23.71 19.87L4.91 27.59L23.71 35.38L23.71 39.75L0 29.61Z" />
				</g>
			</g>
		</svg>
	);
};

export default Arrow;
