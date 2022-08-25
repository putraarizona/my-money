import { useState, useReducer, useEffect } from "react";
import { projectFirestore, timestamp } from "../firebase/Config";

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return { isPending: true, document: null, error: null, success: false };
		case "ADD_DOCUMENT":
			return { isPending: false, document: action.payload, success: true, error: null };
		case "ERROR":
			return { error: action.payload, isPending: false, success: false, document: null };
		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	const [state, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	// collection ref
	const ref = projectFirestore.collection(collection);

	// only dispacth if it's not cancelled
	const dispatchIfIsNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	// Add document
	const addDocument = async (doc) => {
		dispatch({ type: "IS_PENDING" });

		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDoc = await ref.add({ ...doc, createdAt });
			dispatchIfIsNotCancelled({ type: "ADD_DOCUMENT", payload: addedDoc });
		} catch (err) {
			console.log(err.message);
			dispatchIfIsNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const deleteDocument = async (id) => {
		dispatch({ type: "IS_PENDING" });

		try {
			await ref.doc(id).delete();
			dispatchIfIsNotCancelled({ type: "DELETE_DOCUMENT" });
		} catch (err) {
			console.log(err.message);
			dispatchIfIsNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, deleteDocument, state };
};
