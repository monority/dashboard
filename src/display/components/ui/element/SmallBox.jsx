import React from 'react'

const SmallBox = ({title,typeIcon,value,desc}) => {
	return (
		<>
			<div className="smallbox">
				<div className="element_between">
					<h3>{title}</h3>
					<Icon type={typeIcon} size="2rem" />
				</div>
				<div className="element">
					<p className='text_size1'>{desc}</p>
				</div>
				<div className="element">
					<p className='text_size1'>{value}</p>
				</div>
			</div>
		</>
	)
}

export default SmallBox