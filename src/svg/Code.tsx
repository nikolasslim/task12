import React from 'react';
import type { SvgProps } from '@/interfaces/UI';

const CodeIcon: React.FC<SvgProps> = ({ className = '', width, height, ...props }) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M11 15L8.5 12.5L11 10M14 10L16.5 12.5L14 15M5.5 6.5H19.5V18.5H5.5V6.5Z"
				stroke="#121923"
				strokeWidth="1.2"
			/>
		</svg>
	);
};

export default CodeIcon;
