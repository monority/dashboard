import React from 'react';
import Input from '../../components/utils/base/Input';
import Icon from '../../components/utils/Icon';

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
    ];

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
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td>{task.title}</td>
                                            <td className='text_color01 bold'>{task.content}</td>
                                            <td>{task.status}</td>
                                            <td>{task.priority}</td>
                                            <td>
                                                <button className="context_menu_button">
                                                    <Icon type="menu" size="2rem" />
                                                </button>
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