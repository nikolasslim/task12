import React from 'react';
import type { SvgProps } from '@/interfaces/UI';

const SnippetIcon: React.FC<SvgProps> = ({ className = '', width, height, ...props }) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M17 17L22 12L17 7M7 7L2 12L7 17M14 3L10 21"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default SnippetIcon;
