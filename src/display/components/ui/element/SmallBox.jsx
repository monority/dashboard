import React from 'react'
import Icon from '../../utils/Icon'

const SmallBox = ({title,typeIcon,value,desc}) => {
	return (
		<>
			<div className="smallbox box_graph">
				<div className="element_between">
					<p className='text_size3'>{title}</p>
					<Icon type={typeIcon} size="2rem" />
				</div>
				<div className="element">
					<h5 className='text_size4 bold'>{desc}</h5>
				</div>
				<div className="element">
					<p className='text_size1 text_color02'>+{value}% from last month</p>
				</div>
			</div>
		</>
	)
}

export default SmallBox