import PropTypes from "prop-types";
import { Book } from "components";

const BookList = ({ books, onShelfChange }) => {
	return (
		<ol className="books-grid">
			{books.map((book) => (
				<Book book={book} key={book.id} onShelfChange={onShelfChange} />
			))}
		</ol>
	);
};

export { BookList };

BookList.propTypes = {
	books: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired,
};
