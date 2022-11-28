import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { BookDetails, Home, Search } from "./pages";
import * as BooksAPI from "./BooksAPI";

function App() {
	const [shelfBooks, setShelfBooks] = useState([]);
	const [loadingShelf, setLoadingShelf] = useState(true);
	const [errorInLoadingShelf, setErrorInLoadingShelf] = useState(false);

	useEffect(() => {
		const getBooksInShelves = async () => {
			try {
				const response = await BooksAPI.getAll();
				setShelfBooks(response);
				setLoadingShelf(false);
			} catch (error) {
				setLoadingShelf(false);
				setErrorInLoadingShelf(
					"Failed to load books in shelf. Please try again."
				);
			}
		};

		getBooksInShelves();
	}, []);

	const updateBookShelf = async (book, newShelf) => {
		await BooksAPI.update(book, newShelf);
		const isBookInShelf = shelfBooks.find(
			(shelfBook) => shelfBook.id === book.id
		);

		// If a book is added for the first time to any shelf then return
		if (!isBookInShelf) {
			setShelfBooks((prevShelfBooks) => [
				...prevShelfBooks,
				{ ...book, shelf: newShelf },
			]);
			return;
		}
		setShelfBooks((prevShelfBooks) =>
			prevShelfBooks.map((prevShelfBook) =>
				book.id === prevShelfBook.id
					? {
							...prevShelfBook,
							shelf: newShelf,
					  }
					: prevShelfBook
			)
		);
	};

	return (
		<div className="app">
			<Routes>
				<Route
					path="/"
					element={
						<Home
							shelfBooks={shelfBooks}
							onShelfChange={updateBookShelf}
							loadingShelf={loadingShelf}
							errorInLoadingShelf={errorInLoadingShelf}
						/>
					}
				/>
				<Route
					path="/search"
					element={
						<Search
							shelfBooks={shelfBooks}
							onShelfChange={updateBookShelf}
							loadingShelf={loadingShelf}
							errorInLoadingShelf={errorInLoadingShelf}
						/>
					}
				/>
				<Route
					path="/books/:id"
					element={
						<BookDetails
							shelfBooks={shelfBooks}
							onShelfChange={updateBookShelf}
							loadingShelf={loadingShelf}
							errorInLoadingShelf={errorInLoadingShelf}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
