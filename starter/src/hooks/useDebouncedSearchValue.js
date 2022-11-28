import { useEffect, useState } from "react";

const useDebouncedSearchValue = (searchQuery, delay = 1000) => {
	const [debouncedSearchQuery, setDebouncedSearchQuery] =
		useState(searchQuery);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery);
		}, delay);

		return () => clearTimeout(timerId);
	});

	return debouncedSearchQuery;
};

export { useDebouncedSearchValue };
