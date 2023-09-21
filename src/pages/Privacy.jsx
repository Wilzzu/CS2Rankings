import { Link } from "react-router-dom";

const Privacy = () => {
	return (
		<div className="min-h-[100dvh] w-full bg-[url('./assets/background.svg')] bg-repeat-x bg-cover bg-fixed flex justify-center pt-20 px-2">
			<div className="w-full max-w-[768px] h-full bg-cswhitebright p-4 flex flex-col gap-6 md:text-lg font-poppins text-darktext">
				<h1 className="text-lg md:text-2xl">Privacy Policy for CS2Rankings</h1>
				<p>
					CS2Rankings <b>does not</b> collect or store <b>any</b> of your data, or track your usage
					in any way. We also <b>do not</b> use any cookies.
				</p>
				<p>
					<b>However</b>, we do use <b>Cloudflare</b>, a third party service, to protect our website
					from abuse. Cloudflare may collect data or set temporary cookies on your device. You can
					view{" "}
					<a
						href="https://www.cloudflare.com/privacypolicy/"
						target="_blank"
						rel="noreferrer"
						className="text-blue-600 hover:underline hover:underline-offset-1">
						{"Cloudflare's"} privacy policy here
					</a>{" "}
					and{" "}
					<a
						href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/"
						target="_blank"
						rel="noreferrer"
						className="text-blue-600 hover:underline hover:underline-offset-1">
						their cookie policy here
					</a>
					.{" "}
				</p>
				<p>
					If you have additional questions or require more information about our Privacy Policy, do
					not hesitate to contact us by sending an email to{" "}
					<a
						href="mailto:wilzzudev@gmail.com"
						className="font-bold hover:underline hover:underline-offset-1">
						wilzzudev@gmail.com
					</a>
				</p>
				<Link to={"/"} className="text-blue-600 hover:underline hover:underline-offset-1">
					Back to home page
				</Link>
			</div>
		</div>
	);
};

export default Privacy;
