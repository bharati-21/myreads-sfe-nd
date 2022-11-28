import { constants } from "Constants";
import { BookList } from "components/";

const BookShelf = ({ shelf, books, onShelfChange }) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{constants[shelf]}</h2>
			<div className="bookshelf-books">
				<BookList books={books} onShelfChange={onShelfChange} />
			</div>
		</div>
	);
};

export { BookShelf };
