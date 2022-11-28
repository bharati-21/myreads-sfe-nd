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
