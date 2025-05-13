import React from 'react'
import Input from './../../utils/base/Input';
import Button from './../../utils/base/Button';
import Icon from '../../utils/Icon';

const MessageCard = ({ avatar, fullname, email, text01, text02, text03, text04 }) => {
	return (
		<>
			<div className="box_graph message_card">
				<div className="wrapper_between">
					<div className="wrapper_top">
						<div className="element avatar">
							{avatar}
						</div>
						<div className="wrapper_names">
							<div className="element">
								<p className='text_size2 user_name'>{fullname}</p>
							</div>
							<div className="element">
								<p className='text_size2 text_color02'>{email}</p>
							</div>
						</div>
					</div>
					<div className="element_add">
						<Icon type="plus" size="2rem" />
					</div>
				</div>

				<div className="wrapper_conversation">
					<div className="message_element element_left">
						<div className="message_bubble">
							<p className='text_size1'>{text01}</p>
							<span className="message_time">10:12 AM</span>
						</div>
					</div>

					<div className="message_element element_right">
						<div className="message_bubble">
							<p className='text_size1'>{text02}</p>
							<span className="message_time">10:15 AM</span>
						</div>
					</div>

					<div className="message_element element_left">
						<div className="message_bubble">
							<p className='text_size1'>{text03}</p>
							<span className="message_time">10:18 AM</span>
						</div>
					</div>

					<div className="message_element element_right">
						<div className="message_bubble">
							<p className='text_size1'>{text04}</p>
							<span className="message_time">10:20 AM</span>
						</div>
					</div>
				</div>

				<div className="wrapper_bottom">
					<div className="element input_container">
						<Input name="type" type="text" placeholder="Type a message..." inputClassName="input_search" />
					</div>
					<div className="element_send">
						<Button type="primary" size="small" className="btn_send">Send</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default MessageCard