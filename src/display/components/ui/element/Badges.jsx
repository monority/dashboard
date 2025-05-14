import React from 'react'
import Icon from '../../utils/Icon'

const Badge = ({ label, colorBadge = "" }) => {
	return (
		<span className={` badge badge_${colorBadge}`}>{label} <Icon type="upgraph" size='1.5rem'/></span>
	)
}

export default Badge