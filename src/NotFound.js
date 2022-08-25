import { Link } from "react-router-dom";
const NotFound = () => {
	return (
		<div className="notFound">
			<h1>Sorry!</h1>
			<p>Cannot Find The Page</p>
			<Link to="/">Go to the Homepage...</Link>
		</div>
	);
};

export default NotFound;
