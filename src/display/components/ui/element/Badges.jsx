import React from 'react'

const Badge = ({ label, colorBadge = "" }) => {
	return (
		<span className={`badge_${colorBadge}`}>{label}</span>
	)
}

export default Badge