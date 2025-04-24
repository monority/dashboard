import React from 'react'
import Image from '../../../components/utils/base/Image'

const Sales = ({ users = [] }) => {
    // Default data if no users are provided
    const defaultUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            amount: '$345.00',
            date: 'Today, 2:30 PM',
            status: 'Completed',
            avatar: '/images/avatar-1.jpg'
        },
        {
            id: 2,
            name: 'Alice Smith',
            email: 'alice@example.com',
            amount: '$125.00',
            date: 'Yesterday, 10:45 AM',
            status: 'Processing',
            avatar: '/images/avatar-2.jpg'
        },
        {
            id: 3,
            name: 'Robert Johnson',
            email: 'robert@example.com',
            amount: '$750.00',
            date: 'Mar 14, 8:30 AM',
            status: 'Completed',
            avatar: '/images/avatar-3.jpg'
        }
    ];

    // Use provided users or default if empty
    const salesData = users.length > 0 ? users : defaultUsers;

    return (
        <>
            <div className="sales box_graph">
                <div className="container">
                    <div className="wrapper">
                        <div className="element_start">
                            <h3>Recent sales</h3>
                        </div>
                        <div className="element_start">
                            <p className='text_size1 text_color02'>Last 30 days</p>
                        </div>
                    </div>
                    
                    <div className="sales_list">
                        {salesData.map(user => (
                            <div key={user.id} className="sales_item">
                                <div className="user_info">
                                    <div className="avatar">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} />
                                        ) : (
                                            <div className="avatar_placeholder">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user_details">
                                        <h4 className="user_name">{user.name}</h4>
                                        <p className="user_email text_color02">{user.email}</p>
                                    </div>
                                </div>
                                
                                <div className="sale_details">
                                    <div className="amount">{user.amount}</div>
                                    <div className="sale_date text_color02">{user.date}</div>
                                </div>
                                
                                <div className="sale_status">
                                    <span className={`status_badge status_${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="view_all">
                        <button className="btn_text">View all</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sales