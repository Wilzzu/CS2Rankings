const SearchIcon = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36.65 37.93">
		<g>
			<title>Search icon</title>
			<rect
				width={6.36}
				height={16.84}
				x={25.92}
				y={21.96}
				rx={1.57}
				ry={1.57}
				fill={props.color}
				transform="rotate(135 29.102 30.378)"
			/>
			<circle
				cx={14.78}
				cy={14.78}
				r={12.78}
				style={{
					fill: "none",
					strokeMiterlimit: 4,
					strokeWidth: 4,
				}}
				stroke={props.color}
			/>
		</g>
	</svg>
);
export default SearchIcon;
