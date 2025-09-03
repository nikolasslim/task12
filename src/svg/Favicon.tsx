import React from 'react';
import type { SvgProps } from '@/interfaces/UI';

const Favicon: React.FC<SvgProps> = ({ className = '', width, height, ...props }) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox="0 8.859999656677246 66.80000305175781 37.0099983215332"
			data-asc="0.9052734375"
			{...props}
		>
			<defs />
			<g fill="#000000">
				<g transform="translate(0, 0)">
					<path d="M0 29.61L0 25.51L23.71 15.50L23.71 19.87L4.91 27.59L23.71 35.38L23.71 39.75L0 29.61ZM26.46 45.87L36.84 8.86L40.36 8.86L30.00 45.87L26.46 45.87ZM66.80 29.61L43.09 39.75L43.09 35.38L61.87 27.59L43.09 19.87L43.09 15.50L66.80 25.51L66.80 29.61Z" />
				</g>
			</g>
		</svg>
	);
};

export default Favicon;
