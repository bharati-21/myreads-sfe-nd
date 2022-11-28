import { Link } from "react-router-dom";
import { BookShelf } from "./components/BookShelf";
import { constants } from "Constants";

const Home = ({
	shelfBooks = [],
	onShelfChange,
	loadingShelf,
	errorInLoadingShelf,
}) => {
	const { SHELVES: shelves = [] } = constants;
	const getBooksInShelf = (shelf) =>
		shelfBooks.filter((shelfBook) => shelfBook.shelf === shelf);

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			{loadingShelf ? (
				<div className="head">Loading Shelves...</div>
			) : errorInLoadingShelf ? (
				<div className="head error">{errorInLoadingShelf}</div>
			) : (
				<>
					<div className="list-books-content">
						{shelves.map((shelf) => {
							const books = getBooksInShelf(shelf);
							return (
								<BookShelf
									shelf={shelf}
									key={shelf}
									books={books}
									onShelfChange={onShelfChange}
								/>
							);
						})}
					</div>
					<div className="open-search">
						<Link to="/search">Add a book</Link>
					</div>
				</>
			)}
		</div>
	);
};

export { Home };
