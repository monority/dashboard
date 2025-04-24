import React from 'react';

const Graph = ({ type, size = "2rem", action }) => {
	switch (type) {
		case 'line':
			return (
				<svg width="300" height="120" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10,100 
       C30,80 50,80 70,90 
       C90,100 110,60 130,70 
       C150,80 170,120 190,90 
       C210,60 230,50 250,60 
       C270,70 280,30 280,30"
						fill="none"
						stroke="#007bff"
						stroke-width="2"
					/>

					<circle cx="10" cy="100" r="3" fill="#007bff" />
					<circle cx="70" cy="90" r="3" fill="#007bff" />
					<circle cx="130" cy="70" r="3" fill="#007bff" />
					<circle cx="190" cy="90" r="3" fill="#007bff" />
					<circle cx="250" cy="60" r="3" fill="#007bff" />
					<circle cx="280" cy="30" r="3" fill="#007bff" />
				</svg>

			);

		default:
			return null;
	}
};

export default Graph;