import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as BooksAPI from "BooksAPI";
import { Book } from "components";
import { constants } from "Constants";
import { getJoinedAuthorNames } from "utils/getJoinedAuthorNames";

const BookDetails = ({
	shelfBooks,
	onShelfChange,
	loadingShelf,
	errorInLoadingShelf,
}) => {
	const { id: bookId } = useParams();

	const navigate = useNavigate();
	const location = useLocation();
	const { state } = location;
	const [loading, setLoading] = useState(true);
	const [book, setBook] = useState([]);
	const [error, setError] = useState(false);

	const fetchBookDetails = useCallback(async () => {
		try {
			const response = await BooksAPI.get(bookId);
			setBook(response);
		} catch (error) {
			setError("Book not found.");
		}
		setLoading(false);
	}, [bookId]);

	useEffect(() => {
		let mounted = true;
		if (mounted && bookId) {
			if (!state || !Object.keys(state).length) {
				fetchBookDetails();
			} else {
				setBook(state);
				setLoading(false);
			}
		}

		return () => (mounted = false);
	}, [fetchBookDetails, bookId, state]);

	const getShelf = () => {
		const shelfBook = shelfBooks.find((book) => book.id === bookId);
		if (shelfBook) {
			return shelfBook.shelf;
		}

		return book?.shelf || "none";
	};

	if (!bookId || errorInLoadingShelf) {
		navigate("/");
		return null;
	}

	const {
		title = "",
		authors = [],
		description = "",
		categories = [],
		subtitle = "",
	} = book;

	const shelf = getShelf();
	const isCategoryNone = shelf === "none";

	return loading || loadingShelf ? (
		<div className="head">Loading...</div>
	) : (
		<div className="book-details-wrapper">
			<div className="book-title-author">
				{error ? (
					<div className="head error">{error}</div>
				) : (
					<>
						<h2 className="book-title">{title}</h2>
						<h4 className="book-authors">
							{getJoinedAuthorNames(authors)}
						</h4>
					</>
				)}
			</div>
			<div className="book-details-grid">
				<Link to="/" className="back-home">
					Home
				</Link>
				{!error && (
					<>
						<Book book={book} onShelfChange={onShelfChange} />
						<div className="book-details">
							{subtitle ? (
								<div className="subtitle">{subtitle}</div>
							) : null}
							<div className="book-description">
								{description || "No description found"}
							</div>
							<div className="book-tags">
								{categories.map((category) => (
									<span
										className="category-name book-tag"
										key={category}
									>
										{category}
									</span>
								))}
								{!isCategoryNone && (
									<span className="book-tag book-shelf">
										{constants[shelf]}
									</span>
								)}
							</div>
							{isCategoryNone && (
								<div className="none-shelf-message">
									Book not added to any shelf.
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export { BookDetails };
