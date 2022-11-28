const getJoinedAuthorNames = (authors = []) =>
	authors.map((author) => author).join(", ");

export { getJoinedAuthorNames };
