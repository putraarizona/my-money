import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "./TransactionList";

function Home() {
	const { user } = useAuthContext();
	const { document, error } = useCollection("transactions", ["uid", "==", user.uid], ["createdAt", "desc"]);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error && <p>{error}</p>}
				{document && <TransactionList transactions={document} />}
			</div>
			<div className={styles.sidebar}>
				<TransactionForm uid={user.uid} />
			</div>
		</div>
	);
}
export default Home;
