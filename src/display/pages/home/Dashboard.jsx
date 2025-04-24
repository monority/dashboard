import React from 'react'
import GraphCard from '../../components/ui/element/GraphCard'
import Graph from '../../components/utils/Graph'
import Image from '../../components/utils/base/Image'
import BlockChart from '../../components/ui/element/BlockChart'

const Dashboard = () => {
	return (
		<>
			<section id="dashboard">
				<div className="container">
					<div className="container_left">
						<div className="container_side">
							<div className="wrapper_line">
								<div className="element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}


									/>
								</div>

								<div className="element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}
									/>
								</div>
							</div>
						</div>
						<div className="container_side">
							<div className="wrapper_line">
								<div className="element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}
									/>
								</div>

								<div className="element">
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
								<div className="element">
									<GraphCard
										title="Total Sales"
										desc="Total sales in the last 30 days"
										sub="Total sales in the last 30 days"
										graph={<Graph type="line" size="2rem" />}
										height="100%"
									/>
								</div>
								<div className="wrapper_line">
									<div className="element">
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