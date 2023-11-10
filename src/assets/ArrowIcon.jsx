const ArrowIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		width="100%"
		height="100%"
		fill={props.color}
		viewBox="0 0 487 487"
		transform={props.rotate === "down" ? "rotate(180)" : "rotate(0)"}>
		<g>
			<title>Arrow {props.rotate} icon</title>
			<path d="M397.7 376.1c20.4 20.4 53.6 20.4 74 0s20.4-53.6 0-74L280.5 110.9c-20.4-20.4-53.6-20.4-74 0L15.3 302.1c-20.4 20.4-20.4 53.6 0 74s53.6 20.4 74 0l154.2-154.2 154.2 154.2z" />
		</g>
	</svg>
);
export default ArrowIcon;
