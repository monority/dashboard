import React from 'react'

const Search = ({ placeholder, searchTerm, handleSearch }) => {

	return (
		<>
			<input
				type="text"
				placeholder={placeholder}
				value={searchTerm}
				onChange={handleSearch}
				className="search_input input_default"
			/>
		</>
	)
}

export default Search