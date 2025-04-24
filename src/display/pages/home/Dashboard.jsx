import React from 'react'
import GraphCard from '../../components/ui/element/GraphCard'
import Graph from '../../components/utils/Graph'
import Image from '../../components/utils/base/Image'
import BlockChart from '../../components/ui/element/BlockChart'
import MessageCard from '../../components/ui/element/MessageCard'

const Dashboard = () => {
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
										avatar={<Image src="https://i.pinimg.com/564x/4c/0b/8f/4c0b8f1a2d3e5a7d6e9f3a2b5c1e4d7b.jpg" alt="Avatar" />}
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
							<div className="wrapper_line">
								<div className="box_element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}
										height="100%"
									/>
								</div>
								<div className="wrapper_line">
									<div className="box_element">
										<BlockChart />
									</div>


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