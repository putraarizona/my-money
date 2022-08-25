import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";

function TransactionList({ transactions }) {
	const { deleteDocument, state } = useFirestore("transactions");
	return (
		<ul className={styles.transactions}>
			{transactions.map((transaction) => (
				<li key={transaction.id}>
					<p className={styles.name}>{transaction.name}</p>
					<p className={styles.amount}>${transaction.amount}</p>
					<button onClick={() => deleteDocument(transaction.id)}>x</button>
				</li>
			))}
		</ul>
	);
}
export default TransactionList;
