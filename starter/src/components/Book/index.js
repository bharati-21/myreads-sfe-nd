import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getJoinedAuthorNames } from "utils/getJoinedAuthorNames";

const Book = ({ book, onShelfChange }) => {
	const {
		imageLinks: { thumbnail = "" } = {},
		title = "",
		authors = [],
		shelf: prevShelf = "none",
		id,
	} = book;
	const navigate = useNavigate();
	const location = useLocation();
	const [shelf, setShelf] = useState(prevShelf);

	const handleShelfChange = (e) => {
		const newShelf = e.target.value;
		onShelfChange(book, newShelf);
		setShelf(newShelf);
	};

	const handleShelfChangerClicked = (e) => {
		e.stopPropagation();
	};

	const handleBookSelected = () => {
		if (location?.pathname.includes("/books")) {
			return;
		}
		navigate(`/books/${id}`, { state: book });
	};

	return (
		<li>
			<div className="book" onClick={handleBookSelected}>
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${thumbnail})`,
						}}
					></div>
					<div
						className="book-shelf-changer"
						onClick={handleShelfChangerClicked}
					>
						<select value={shelf} onChange={handleShelfChange}>
							<option value="" disabled>
								Move to...
							</option>
							<option value="currentlyReading">
								Currently Reading
							</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{title}</div>
				<div className="book-authors">
					{getJoinedAuthorNames(authors)}
				</div>
			</div>
		</li>
	);
};

export { Book };

Book.propTypes = {
	book: PropTypes.object.isRequired,
	onShelfChange: PropTypes.func.isRequired,
};
