import { Ring } from "@uiball/loaders";
import { cn } from "../../../../lib/utils";
import refreshIcon from "../../../assets/refreshIcon.svg";
import refreshIconDark from "../../../assets/refreshIconDark.svg";
import checkIcon from "../../../assets/checkIcon.svg";
import checkIconDark from "../../../assets/checkIconDark.svg";
import errorIcon from "../../../assets/errorIcon.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RefreshButton = (props) => {
	const [state, setState] = useState("none");
	const darkmode = useSelector((state) => state.darkmode);

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
				"group h-12 md:h-full w-full py-2 pr-3 pl-2 flex gap-1 md:gap-2 items-center md:justify-center",
				state === "none" && "hover:bg-hoverwhite dark:hover:bg-darkhoverwhite",
				props.isSticky
					? "bg-cswhitesemi dark:bg-darkcswhitesemi"
					: "bg-cswhitebright dark:bg-darkcswhitebright"
			)}
			onClick={() => handleClick()}>
			{/* Button image */}
			<div className="w-8 h-full flex items-center justify-center overflow-hidden">
				{state === "loading" ? (
					<Ring
						size={props.isMobile ? 16 : 24}
						lineWeight={8}
						speed={2}
						color={darkmode ? "#e38618" : "#4A68FF"}
					/>
				) : (
					// TODO: Make these jsx icons
					<>
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
								"duration-700 select-none w-4 h-4 md:w-6 md:h-6 dark:hidden",
								state === "none" && "group-active:rotate-180 group-hover:-rotate-[22deg]"
							)}
						/>
						<img
							src={
								state === "done"
									? checkIconDark
									: state === "error"
									? errorIcon
									: state === "none" && refreshIconDark
							}
							alt="Refresh icon"
							className={cn(
								"duration-700 select-none w-4 h-4 md:w-6 md:h-6 hidden dark:block",
								state === "none" && "group-active:rotate-180 group-hover:-rotate-[22deg]"
							)}
						/>
					</>
				)}
			</div>
			<p>Refresh</p>
		</button>
	);
};

export default RefreshButton;
