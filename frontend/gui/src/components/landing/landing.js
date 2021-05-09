import React, { Component } from 'react';

class Landing extends Component {
	render() {
		return (
			<>
				<div className='container landing-header'>
					<div className='landing-header-text'>
						<h1> Listen, Share, Grow</h1>
						<p> Enjoy Endless Music</p>

						<div className='landing-header-btn d-flex justify-content-center'>
							<button className='btn-signup'>Sign Up</button>
							<button className='btn-learn'> Learn More</button>
						</div>
					</div>
				</div>
				<div className='container carousel-container'>
					<div id='carouselExampleIndicators' class='carousel slide' data-ride='carousel'>
						<div class='carousel-inner'>
							<div class='carousel-item active'>
								<div class='d-flex justify-content-start'>
									<div className='carousel-card-img '>
										<img src={`${process.env.PUBLIC_URL}/Assests/images/cover3.jpg`} alt='...' width='100%' />
									</div>
									<div className='carousel-card-text d-flex flex-column justify-content-center align-items-center'>
										<h1> AI Composer </h1>
										<p> A creative AI composer that can automatically generate music</p>
										<div>
											<button className='btn carousel-btn'> Learn More</button>
										</div>
									</div>
								</div>
							</div>
							<div class='carousel-item '>
								<div class='d-flex justify-content-start'>
									<div className='carousel-card-img'>
										<img src={`${process.env.PUBLIC_URL}/Assests/images/cover2.jpg`} alt='...' width='100%' />
									</div>
									<div className='carousel-card-text d-flex flex-column justify-content-center align-items-center'>
										<h1>Music Player </h1>
										<p> Enjoy Endless Music</p>
										<div>
											<button className='btn carousel-btn'> Listen Now </button>
										</div>
									</div>
								</div>
							</div>
							<div class='carousel-item '>
								<div class='d-flex justify-content-start'>
									<div className='carousel-card-img '>
										<img src={`${process.env.PUBLIC_URL}/Assests/images/cover1.jpg`} alt='...' width='100%' />
									</div>
									<div className='carousel-card-text d-flex flex-column justify-content-center'>
										<h1> Listen, Share, Grow </h1>
										<p> Build a community of like minded individuals with whom you can share your creation.</p>
										<div>
											<button className='btn carousel-btn'> Learn More</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<a class='carousel-control-prev ' href='#carouselExampleIndicators' role='button' data-slide='prev'>
							<span class='carousel-control-prev-icon' aria-hidden='true'></span>
						</a>
						<a class='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
							<span class='carousel-control-next-icon' aria-hidden='true'></span>
						</a>
					</div>
				</div>
			</>
		);
	}
}

export default Landing;
