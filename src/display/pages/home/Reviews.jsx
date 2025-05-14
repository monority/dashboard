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
						<div className="wrapper_between">
							<div className="element_column">
								<div className="element">
									<h2>Total reviews</h2>
								</div>
								<div className="element">
									<p>+ 5k</p>
									<Badge label="21%" colorBadge="green" />
								</div>
								<div className="element">

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