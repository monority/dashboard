import React from 'react'
import Icon from '../../utils/Icon'

const Badge = ({ label, colorBadge = "", icon = false }) => {
    return (
        <span className={`badge badge_${colorBadge}`}>
            {label}
            {icon && <Icon type="upgraph" size='1.5rem' />}
        </span>
    )
}

export default Badge