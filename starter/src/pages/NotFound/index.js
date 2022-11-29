import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="not-found-wrapper">
			<div className="list-books-title">
                <h1>404 Page Not Found</h1>
            </div>
			<Link to="/" className="button">Home</Link>
            <div className="not-found-image"></div>
		</div>
	);
};

export { NotFound };
