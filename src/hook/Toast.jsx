import { useEffect } from "react";

const Toast = ({ type, message, onHide }) => {
	const toastClasses = {
		success: "border-2 border-success",
		error: "border-2 border-error",
		loading: "border-2 border-warning",
	};

	useEffect(() => {
		const timeoutId = setTimeout(onHide, 3000);
		return () => clearTimeout(timeoutId);
	}, [onHide]);

	return (
		<div
			className="toast toast-top toast-center"
			style={{ zIndex: "9999" }}
		>
			<div
				className={`alert bg-white text-gray-600 font-semibold rounded-md shadow-md ${toastClasses[type]}`}
			>
				<p className="flex justify-center items-center">{message}</p>
			</div>
		</div>
	);
};

export default Toast;
