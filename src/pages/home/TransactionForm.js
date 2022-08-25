import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

function TransactionForm({ uid }) {
	const [amount, setAmount] = useState("");
	const [name, setName] = useState("");

	const { addDocument, state } = useFirestore("transactions");

	const handleSubmit = (e) => {
		e.preventDefault();

		addDocument({ name, amount, uid });
	};

	// reset fields form
	useEffect(() => {
		if (state.success) {
			setName("");
			setAmount("");
		}
	}, [state.success]);

	return (
		<>
			<h3>Add a Transaction</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Transaction Name:</span>
					<input type="text" required onChange={(e) => setName(e.target.value)} value={name} />
				</label>
				<label>
					<span>Amount ($):</span>
					<input type="number" required onChange={(e) => setAmount(e.target.value)} value={amount} />
				</label>

				<button className="btn">Add Transaction</button>
			</form>
		</>
	);
}
export default TransactionForm;
