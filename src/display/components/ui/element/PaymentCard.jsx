import React from 'react'

const PaymentCard = () => {
	return (
		<div className="payment_card box_graph">
			<div className="container">
				<div className="wrapper">
					<div className="element">
						<h3>Payments</h3>
					</div>
					<div className="element">
						<p>Manage your payments</p>
					</div>
				</div>
				<div className="wrapper">
					<div className="element"></div>
					<div className="element"></div>
				</div>
				<div className="table_container">
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Amount</th>
								<th>Date</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>123456</td>
								<td>$100.00</td>
								<td>2023-10-01</td>
								<td>Completed</td>
							</tr>
							<tr>
								<td>123456</td>
								<td>$100.00</td>
								<td>2023-10-01</td>
								<td>Completed</td>
							</tr>
							<tr>
								<td>123456</td>
								<td>$100.00</td>
								<td>2023-10-01</td>
								<td>Completed</td>
							</tr>
							<tr>
								<td>123456</td>
								<td>$100.00</td>
								<td>2023-10-01</td>
								<td>Completed</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="wrapper">
					<div className="element"></div>
					<div className="element"></div>
				</div>
			</div>
		</div>
	)
}

export default PaymentCard
