import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookList } from "components/";
import * as BooksAPI from "BooksAPI";
import { useDebouncedSearchValue } from "hooks/useDebouncedSearchValue";

const Search = ({
	onShelfChange,
	shelfBooks,
	loadingShelf,
	errorInLoadingShelf,
}) => {
	const [searching, setSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchedBooks, setSearchedBooks] = useState([]);
	const debouncedSearchQuery = useDebouncedSearchValue(searchQuery);
	const navigate = useNavigate();

	const searchBooks = useCallback(
		async (value) => {
			let searchValue = value.trim();
			if (!searchValue) {
				setSearching(false);
				setSearchedBooks([]);
				return;
			}
			const response = await BooksAPI.search(searchValue, 10);

			if (response && Array.isArray(response)) {
				const updatedBooks = response.map((book) => {
					const bookInShelf = shelfBooks.find(
						(shelfBook) => shelfBook.id === book.id
					);
					if (!bookInShelf) {
						return book;
					}

					return {
						...book,
						shelf: bookInShelf.shelf,
					};
				});

				setSearchedBooks(updatedBooks);
			} else {
				setSearchedBooks([]);
			}
			setSearching(false);
		},
		[shelfBooks]
	);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			searchBooks(debouncedSearchQuery);
		}

		return () => (mounted = false);
	}, [debouncedSearchQuery, searchBooks]);

	const handleSearchQueryChange = (e) => {
		setSearching(true);
		setSearchQuery(e.target.value);
	};

	if (errorInLoadingShelf) {
		navigate("/");
		return null;
	}

	return loadingShelf ? (
		<div className="head">Loading...</div>
	) : (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/" className="close-search">
					Close
				</Link>

				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title, author, or ISBN"
						value={searchQuery}
						onChange={handleSearchQueryChange}
					/>
				</div>
			</div>
			<div className="search-books-results">
				{
					// not tpying or search query is null
					(!searching || !searchQuery.trim()) && null
				}
				{searching ? (
					<h3 className="head">Searching...</h3>
				) : (
					searchQuery.trim() &&
					(searchedBooks.length ? (
						<BookList
							books={searchedBooks}
							onShelfChange={onShelfChange}
						/>
					) : (
						<h3 className="head">No books found!</h3>
					))
				)}
			</div>
		</div>
	);
};

export { Search };
