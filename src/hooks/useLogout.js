import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/Config";
import { useState, useEffect } from "react";

export const useLogout = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const [isCancelled, setIsCancelled] = useState(false);

	const logout = async () => {
		setError(null);
		setIsPending(true);
		try {
			await projectAuth.signOut();

			dispatch({ type: "LOGOUT" });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setIsPending(false);
				setError(err.message);
				console.log(err.message);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { logout, error, isPending };
};
