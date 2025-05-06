import React from 'react';
import Input from '../../components/utils/base/Input';
import Icon from '../../components/utils/Icon';
import { useState } from 'react';

const Task = () => {
	const tasks = [
		{
			id: 1,
			title: 'Design Meeting',
			content: 'Discuss the new dashboard layout with the design team.',
			status: 'In Progress',
			priority: 'High',
		},
		{
			id: 2,
			title: 'API Integration',
			content: 'Integrate the new analytics API into the dashboard.',
			status: 'Pending',
			priority: 'Medium',
		},
		{
			id: 3,
			title: 'Bug Fixes',
			content: 'Resolve reported issues in the user authentication module.',
			status: 'Completed',
			priority: 'Low',
		},
		{
			id: 4,
			title: 'Team Sync',
			content: 'Weekly team sync to discuss project updates.',
			status: 'In Progress',
			priority: 'Medium',
		},
		{
			id: 5,
			title: 'Client Presentation',
			content: 'Prepare slides for the client presentation on Q2 progress.',
			status: 'Pending',
			priority: 'High',
		},
		{
			id: 6,
			title: 'Code Review',
			content: 'Review pull requests for the new feature branch.',
			status: 'Completed',
			priority: 'Low',
		},
		{
			id: 7,
			title: 'Database Migration',
			content: 'Migrate the database to the new cloud provider.',
			status: 'Pending',
			priority: 'High',
		},
		{
			id: 8,
			title: 'UI Testing',
			content: 'Perform end-to-end testing for the new UI components.',
			status: 'In Progress',
			priority: 'Medium',
		},
	];
	const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (taskId) => {
        setActiveMenu((prev) => (prev === taskId ? null : taskId));
    };
	return (
		<>
			<section className="task">
				<div className="container">
					<div className="wrapper_column gap1">
						<div className="element">
							<h1>Welcome back</h1>
						</div>
						<div className="element">
							<p className='text_size3 text_color02'>A summary of your month tasks</p>
						</div>
						<div className="wrapper">
							<div className="element">
								<Input
									type="text"
									inputClassName="input_search"
									placeholder="Filter"
									icon={<Icon type="filter" size="2rem" />}
								/>
							</div>
						</div>
						<div className="element w_100">
							<table className="task_table">
								<thead>
									<tr>
										<th></th>
										<th>Title</th>
										<th>Content</th>
										<th>Status</th>
										<th>Priority</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{tasks.map((task) => (
										<tr key={task.id}>
											<td data-label="Select">
												<input type="checkbox" />
											</td>
											<td data-label="Title">{task.title}</td>
											<td data-label="Content" className="text_color01 bold">{task.content}</td>
											<td data-label="Status">{task.status}</td>
											<td data-label="Priority">{task.priority}</td>
											<td data-label="Actions">
												<div className="relative">
													<button
														className="context_menu_button"
														onClick={() => toggleMenu(task.id)}
													>
														<Icon type="menu" size="2rem" />
													</button>
													<div
														className={`${activeMenu === task.id ? 'flex' : 'none'
															} drop_menu standart_box`}
													>
														<ul className="drop_menu_list">
															<li className="drop_menu_item">Edit</li>
															<li className="drop_menu_item">Delete</li>
														</ul>
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Task;