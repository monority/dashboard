import React from 'react'

const MailCard = ({ fullName, date, subtitle, content, badge }) => {
    return (
        <>
            <>
                <div className="element_between">
                    <h5>{fullName}</h5>
                    <p className='text_size1'>{date}</p>
                </div>
                <div className="element_subtitle">
                    <p className='text_size1 text_color01'>{subtitle}</p>
                </div>
                <div className="element_message">
                    <p className="text_size2">{content}</p>
                </div>
                <div className="flex gap1 a_center">
                    {badge && badge.map((item, index) => {
                        const isObject = typeof item === 'object';
                        const badgeText = isObject ? item.text : item;
                        const badgeType = isObject ? item.type : item.toLowerCase().replace(/\s+/g, '-');
                        
                        return (
                            <div key={index} className={`badge text_size1 badge-${badgeType}`}>
                                <p>{badgeText}</p>
                            </div>
                        );
                    })}
                </div>
            </>
        </>
    )
}

export default MailCard