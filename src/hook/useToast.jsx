// Custom hook for toast management
import { useState } from "react";

const useToast = () => {
	const [toastType, setToastType] = useState("");
	const [toastMessage, setToastMessage] = useState("");

	const showToast = (type, message) => {
		setToastType(type);
		setToastMessage(message);
	};

	const hideToast = () => {
		setToastType("");
		setToastMessage("");
	};

	return {
		toastType,
		toastMessage,
		showToast,
		hideToast,
	};
};

export default useToast;
