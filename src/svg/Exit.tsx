import React from 'react';
import type { SvgProps } from '@/interfaces/UI';

const ExitIcon: React.FC<SvgProps> = ({ className = '', width, height, ...props }) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox="0 0 600 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M130 0C58.672245 0 0 58.672245 0 130V470C0 541.32776 58.672245 600 130 600H301.578C367.833 600 423.136 549.367 430.672 485H349.436C343.322 505.66 324.704 520 301.578 520H130C101.608 520 80 498.392 80 470V130C80 101.608 101.608 80 130 80H301.578C324.704 80 343.322 94.3397 349.436 115H430.672C423.136 50.633 367.833 0 301.578 0H130Z"
				fill="currentColor"
			/>
			<path
				d="M476.863 180A40 40 0 0 0 448.578 191.715A40 40 0 0 0 448.578 248.285L460.293 260H163.727A40 40 0 0 0 123.727 300A40 40 0 0 0 163.727 340H460.293L448.578 351.715A40 40 0 0 0 448.578 408.285A40 40 0 0 0 505.148 408.285L577.939 335.494A40 40 0 0 0 600 300A40 40 0 0 0 577.529 264.095L505.148 191.714A40 40 0 0 0 476.863 180Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default ExitIcon;
