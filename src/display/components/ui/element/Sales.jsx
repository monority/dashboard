import React from 'react'
import Image from '../../../components/utils/base/Image'

const Sales = ({ users = [] }) => {
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
							<div key={user.id} className="wrapper_between">
								<div className="user_info">

									<div className="user_details">
										<h5 className="user_name">{user.name}</h5>
										<p className="user_email text_color02 text_size1">{user.email}</p>
									</div>
								</div>

								<div className="sale_details">
									<div className="amount bold text_size1">{user.amount}</div>
								</div>


							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Sales