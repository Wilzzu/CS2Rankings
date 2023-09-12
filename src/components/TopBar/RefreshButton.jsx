import { Ring } from "@uiball/loaders";
import { cn } from "../../../lib/utils";
import refreshIcon from "../../assets/refreshIcon.svg";
import checkIcon from "../../assets/checkIcon.svg";
import errorIcon from "../../assets/errorIcon.svg";
import { useEffect, useState } from "react";

const RefreshButton = (props) => {
	const [state, setState] = useState("none");

	const handleClick = () => {
		setState("loading");
		props.refetch();
	};

	// State logic
	useEffect(() => {
		if (state === "loading" && props.data) setState("done");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.data]);

	useEffect(() => {
		if (state === "loading" && !props.fakeRefetch) setState("done");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.fakeRefetch]);

	useEffect(() => {
		if (state === "loading" && !props.isRefetching) setState("done");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.isRefetching]);

	useEffect(() => {
		if (state === "loading" && (props.isRefetchError || props.isError)) setState("error");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.isRefetchError, props.isError]);

	// Clear state after some time
	useEffect(() => {
		if (state === "done" || state === "error")
			setTimeout(() => {
				setState("none");
			}, 3000);
	}, [state]);

	return (
		<button
			disabled={state !== "none"}
			className={cn(
				"group duration-200 aspect-square h-14 w-14 p-4 flex items-center justify-center",
				state === "none" && "hover:bg-hoverwhite",
				props.isSticky ? "bg-cswhite" : "bg-cswhitebright"
			)}
			onClick={() => handleClick()}>
			{/* Button image */}
			{state === "loading" ? (
				<Ring size={42} lineWeight={8} speed={2} color="#4A68FF" />
			) : (
				<img
					src={
						state === "done"
							? checkIcon
							: state === "error"
							? errorIcon
							: state === "none" && refreshIcon
					}
					alt="Refresh icon"
					className={cn(
						"duration-700 select-none",
						state === "none" && "group-active:rotate-180 group-hover:-rotate-[22deg]"
					)}
				/>
			)}
		</button>
	);
};

export default RefreshButton;
