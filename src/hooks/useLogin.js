import { useAuthContext } from "./useAuthContext";
import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/Config";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const [isCancelled, setIsCancelled] = useState(false);

	const login = async (email, password) => {
		setError(null);
		setIsPending(true);

		try {
			const res = await projectAuth.signInWithEmailAndPassword(email, password);

			if (!res) {
				throw new Error("Couldn't find the user");
			}

			dispatch({ type: "LOGIN", payload: res.user });

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

	return { login, error, isPending };
};
