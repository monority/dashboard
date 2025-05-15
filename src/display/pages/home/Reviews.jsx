import React from 'react'
import Badge from '../../components/ui/element/Badges'

const Reviews = () => {
	return (
		<>
			<section className="reviews">
				<div className="container">
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
									<Badge colorBadge="success_light" label="21%"  />
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
								</div>
								<div className="element">
									<p className='text_color02'>Average rating this year</p>
								</div>
							</div>
							<div className="element_column gap2">
								<div className="element">
									<h2>Total reviews</h2>
								</div>
								<div className="element_row gap2">
									<p>+ 5k</p>
									<Badge colorBadge="success_light" label="21%"  />
								</div>
								<div className="element">
									<p className='text_color02'>Total growth this year</p>
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