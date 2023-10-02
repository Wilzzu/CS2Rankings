const CheckIcon = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 41.946 43.417">
			<g>
				<title>Check icon</title>
				<rect
					width={23.463}
					height={10}
					fill={props.color}
					rx={5}
					transform="rotate(-120 18.314 18.174)"
				/>
				<rect
					width={46}
					height={10}
					fill={props.color}
					rx={5}
					transform="rotate(-54.97 39.895 11.753)"
				/>
			</g>
		</svg>
	);
};

export default CheckIcon;
