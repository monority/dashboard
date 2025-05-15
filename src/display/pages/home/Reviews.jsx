import React from 'react'
import Badge from '../../components/ui/element/Badges'

const Reviews = () => {
	const fakeReviews = [
		{
			name: "Alice Dupont",
			totalSpend: "€1,250",
			totalReviews: 12,
			rating: 5,
			date: "2025-03-12",
			text: "Excellent service! The delivery was very fast and the product matched the description perfectly. I am extremely satisfied and will definitely order again. Highly recommended for anyone looking for quality and reliability.",
			favorite: false,
		},
		{
			name: "Jean Martin",
			totalSpend: "€320",
			totalReviews: 3,
			rating: 4,
			date: "2025-02-27",
			text: "Good value for money. The customer service was responsive and helpful when I had questions about my order. The product works well, though the packaging could be improved. Overall, a positive experience.",
			favorite: true,
		},
		{
			name: "Sophie Bernard",
			totalSpend: "€2,100",
			totalReviews: 20,
			rating: 5,
			date: "2025-01-15",
			text: "I am always satisfied with my orders from this shop. The products are consistently high quality and the support team is always ready to help. Thank you for making online shopping so easy and pleasant!",
			favorite: false,
		},
		{
			name: "Lucas Petit",
			totalSpend: "€150",
			totalReviews: 1,
			rating: 3,
			date: "2024-12-02",
			text: "The delivery took a bit longer than expected, but the product itself was decent and matched the description. Communication could be improved, but overall I am satisfied with my purchase.",
			favorite: false,
		},
	]
	const renderStars = (count) =>
		<span style={{ color: "#FFD700", fontSize: "1.1em" }}>
			{"★".repeat(count) + "☆".repeat(5 - count)}
		</span>

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
									<Badge colorBadge="success_light" label="21%" icon="true" />
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
						<div className="element_column gap2">
							<div className="element">
								<h2>Reviews</h2>
							</div>
							<div
								className="element_column gap1 reviews-scroll"
								style={{
									maxHeight: "50rem",
									overflowY: "auto",
									paddingRight: "8px"
								}}
							>
								{fakeReviews.map((review, idx) => (
									<div className="review-card" key={idx} style={{
										border: "1px solid #eee",
										borderRadius: 8,
										padding: "1rem",
										marginBottom: "1rem",
										background: "#fff",
										boxShadow: "0 1px 4px 0 #0001"
									}}>
										{/* ...existing review content... */}
										<div className="review-header" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: 4 }}>
											<strong>{review.name}</strong>
											<Badge label={`Dépensé: ${review.totalSpend}`} colorBadge="info" />
											<Badge label={`Avis: ${review.totalReviews}`} colorBadge="secondary" />
											<span style={{ marginLeft: "auto", fontSize: "0.9em", color: "#888" }}>
												{new Date(review.date).toLocaleDateString()}
											</span>
										</div>
										<div className="review-rating" style={{ marginBottom: 4 }}>
											{renderStars(review.rating)}
										</div>
										<div className="review-text" style={{ fontSize: "0.95em", marginBottom: 8 }}>
											{review.text}
										</div>
										<div className="review-actions" style={{ display: "flex", gap: "0.5rem" }}>
											<button className="btn btn-sm btn-primary">Direct message</button>
											<button className="btn btn-sm btn-fav" title="Favori" style={{
												background: review.favorite ? "#ffb6b6" : "#eee",
												color: review.favorite ? "#e57373" : "#888",
												border: "none",
												borderRadius: "50%",
												width: 28,
												height: 28,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: "1.1em",
												cursor: "pointer"
											}}>
												<span role="img" aria-label="heart">♥</span>
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Reviews