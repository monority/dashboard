import React from 'react'
import GraphCard from '../../components/ui/element/GraphCard'
import Graph from '../../components/utils/Graph'
import Image from '../../components/utils/base/Image'
import BlockChart from '../../components/ui/element/BlockChart'
import MessageCard from '../../components/ui/element/MessageCard'
import Icon from '../../components/utils/Icon'
import PaymentCard from '../../components/ui/element/PaymentCard'
import SmallBox from '../../components/ui/element/SmallBox'
import Sales from '../../components/ui/element/Sales'

const Dashboard = () => {
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
	const values = [25, 45, 65, 35, 80, 90, 100, 120];
	return (
		<>
			<section id="dashboard">
				<div className="container">
					<div className="container_left">
						<div className="container_side">
							<div className="wrapper_line">
								<SmallBox
									title="Total Revenue"
									typeIcon="money"
									desc="$45,000.00"
									value="20,3"
								/>
								<SmallBox
									title="Subscriptions"
									typeIcon="money"
									desc="2350"
									value="11.7"
								/>
								<SmallBox
									title="Sales"
									typeIcon="money"
									desc="12500"
									value="5.7"
								/>
								<SmallBox
									title="Active now"
									typeIcon="money"
									desc="125"
									value="45"
								/>

								{/* <div className="box_element">
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
								</div> */}
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
									<Sales />
								</div>

							</div>
						</div>
						<div className="container_side">
							<div className="wrapper_line">
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
										labels={labels}
										title="Sales Overview"
										desc="Sales overview for the last 7 days"
									/>
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