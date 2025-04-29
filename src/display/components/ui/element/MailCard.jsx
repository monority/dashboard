import React from 'react'

const MailCard = ({ fullName,date,subtitle,content,badge }) => {
	return (
		<>
			<div className="mail_box">
				<div className="element_between">
					<p>{fullName}</p>
					<p>{date}</p>
				</div>
				<div className="element_subtitle">
				<p>{subtitle}</p>
				</div>
				<div className="element_message">
				<p>{content}</p>
				</div>
				<div className="element_badge">
					<p>{badge}</p>
				</div>
			</div>
		</>
	)
}

export default MailCard