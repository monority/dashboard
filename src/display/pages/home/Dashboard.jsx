import React from 'react'
import GraphCard from '../../components/ui/element/GraphCard'
import Graph from '../../components/utils/Graph'
import Image from '../../components/utils/base/Image'
import BlockChart from '../../components/ui/element/BlockChart'
import MessageCard from '../../components/ui/element/MessageCard'
import Icon from '../../components/utils/Icon'
import PaymentCard from '../../components/ui/element/PaymentCard'

const Dashboard = () => {
	const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	const values = [25, 45, 65, 35, 80];
	return (
		<>
			<section id="dashboard">
				<div className="container">
					<div className="container_left">
						<div className="container_side">
							<div className="wrapper_line">
								<div className="box_element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}


									/>
								</div>

								<div className="box_element">
									<MessageCard
										avatar={<Icon type="character" size="2rem" />}
										fullname="John Doe"
										email="example@gmail.com"
										text01="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
										text02="Ut enim ad minim veniam, quis nostrud exercitation."
										text03="Duis aute irure dolor in reprehenderit in voluptate."
										text04="Excepteur sint occaecat cupidatat non proident."
									/>
								</div>
							</div>
						</div>
						<div className="container_side">
							<div className="wrapper_line">
								<div className="box_element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}
									/>
								</div>

								<div className="box_element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="container_right">
						<div className="container_side">
							<div className="wrapper_column gap2">
								<div className="box_element">
									<PaymentCard
									/>
								</div>
								<div className="box_element">
									<BlockChart
										values={values}
										labels={labels} />
								</div>


							</div>
						</div>

					</div>

				</div>
			</section>
		</>
	)
}

export default Dashboard