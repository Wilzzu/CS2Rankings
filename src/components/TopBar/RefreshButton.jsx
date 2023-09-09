const RefreshButton = (props) => {
	// TODO: Like in wheel
	return (
		<button className="bg-orange-300" onClick={() => props.refetch()}>
			Refresh
		</button>
	);
};

export default RefreshButton;
