import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Search } from "./pages";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</div>
	);
}

export default App;
