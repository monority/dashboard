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
						<div className="element">
							{avatar}
						</div>
						<div className="wrapper_names">
							<div className="element">
								<p className='text_size2'>{fullname}</p>
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
					<div className="element_left">
						<p className='text_size1'>{text01}</p>
					</div>
					<div className="element_right">
						<p className='text_size1'>{text02}</p>

					</div>
					<div className="element_left">
						<p className='text_size1'>{text03}</p>

					</div>
					<div className="element_right">
						<p className='text_size1'>{text04}</p>

					</div>
				</div>
				<div className="wrapper_bottom">
					<div className="element">
						<Input name="type" type="text" placeholder="Type a message..." className="input_message" />

					</div>
					<div className="element_send">
						<Button type="primary" size="small" className="btn_send">Send </Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default MessageCard