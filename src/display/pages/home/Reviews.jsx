import React from 'react'
import Badge from '../../components/ui/element/Badges'

const Reviews = () => {
	return (
		<>
			<section className="reviews">
				<div className="container flex column gap4">
					<div className="wrapper">
						<div className="element_between">
							<div className="element">
								<h1>Reviews</h1>
							</div>
							<div className="element">
								<button className="btn btn-primary">March 2024 - February 2025</button>
							</div>
						</div>

					</div>
					<div className="container">
						<div className="wrapper_responsive">
							<div className="element_column gap2">
								<div className="element">
									<h2>Total reviews</h2>
								</div>
								<div className="element_row gap2">
									<p>+ 5k</p>
									<Badge colorBadge="success_light" label="21%" />
								</div>
								<div className="element">
									<p className='text_color02'>Total growth this year</p>
								</div>
							</div>
							<div className="element_column gap2">
								<div className="element">
									<h2>Average Rating</h2>
								</div>
								<div className="element_row gap2">
									<p>4.5</p>
									<span>
										<span style={{ color: "#FFD700", fontSize: "1.2em" }}>
											★★★★☆
										</span>
									</span>
								</div>
								<div className="element">
									<p className='text_color02'>Average rating this year</p>
								</div>
							</div>
							<div className="element_column gap2">
			
								<div className="element votes-bars">
									<div className="vote-bar-row">
										<span className="vote-bar-label">5</span>
										<div className="vote-bar vote-bar-5"></div>
										<span className="vote-bar-count">400</span>
									</div>
									<div className="vote-bar-row">
										<span className="vote-bar-label">4</span>
										<div className="vote-bar vote-bar-4"></div>
										<span className="vote-bar-count">200</span>
									</div>
									<div className="vote-bar-row">
										<span className="vote-bar-label">3</span>
										<div className="vote-bar vote-bar-3"></div>
										<span className="vote-bar-count">120</span>
									</div>
									<div className="vote-bar-row">
										<span className="vote-bar-label">2</span>
										<div className="vote-bar vote-bar-2"></div>
										<span className="vote-bar-count">80</span>
									</div>
									<div className="vote-bar-row">
										<span className="vote-bar-label">1</span>
										<div className="vote-bar vote-bar-1"></div>
										<span className="vote-bar-count">50</span>
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

export default Reviews