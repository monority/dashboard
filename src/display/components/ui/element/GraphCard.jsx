import React from 'react'

const GraphCard = ({ title, desc, sub, graph, height }) => {
	return (
		<>
			<div className="box_graph" style={{height : height}}>
				<div className="wrapper">
					<div className="wrapper">
						<div className="element">
							<h3>{title}</h3>
						</div>
						<div className="element">
							<p className='text_size2'>{desc}</p>
						</div>
						<div className="element">
							<p className='text_size1 text_color02'>{sub}</p>
						</div>
					</div>
					<div className="wrapper">
						<div className="element">
							{graph}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default GraphCard