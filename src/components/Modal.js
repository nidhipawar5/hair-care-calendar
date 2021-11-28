import React, { useRef } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import EventWrapper from './EventWrapper';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MonthsFullForm } from '../utils/constants';

const CardRatingWrapper = styled.div`
	font-size: 16px;
`;

const CardWrapper = styled.div`
	width: 100%;
	height: 550px;
	background: white;
	border-radius: 5px;
`;

const CardImageWrapper = styled.img`
	border-radius: 5px 5px 0 0;
	width: 100%;
	height: 65%;
`;

const CardMarginWrapper = styled.div`
	width: 450px;
`;

const DetailsWrapper = styled.div`
	box-sizing: border-box;
	width: 95%;
	margin: auto;
	padding: 5px;
	position: relative;
`;

const LegendDetails = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const DescripWrapper = styled.div`
	height: 100px;
`;

const ViewPostButton = styled.div`
	width: 100%;
	margin: auto;
	padding-top: 3px;
	height: 25px;
	border-top: 1px solid black;
	text-align: center;
	position: absolute;
	bottom: -11px;
	font-size: 20px;
	font-weight: bold;
	left: 0;
`;

const customStyles = {
	content: {
		top: 0,
		left: 0,
		right: 'auto',
		bottom: 'auto',
		backgroundColor: 'transparent',
		border: 'none',
		width: '100%',
		height: '100%',
	},
	overlay: {
		backgroundColor: 'rgb(0, 0, 0)',
	},
};

Modal.setAppElement('#root');

export default function ModalComponent({
	isOpen,
	setIsOpen,
	currentModalIndex,
	width,
	posts,
	dateArray,
}) {
	const sliderRef = useRef(null);
	let settings = {
		className: 'center',
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 1,
		speed: 500,
		arrows: width > 700 ? true : false,
		infinite: true,
		focusOnSelect: true,
	};

	const truncate = (input) =>
		input.length > 70 ? `${input.substring(0, 70)}...` : input;

	function AfterOpenModal() {
		sliderRef.current.slickGoTo(currentModalIndex, true);
	}

	function CloseModal() {
		setIsOpen((prev) => !prev);
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onAfterOpen={AfterOpenModal}
				onRequestClose={CloseModal}
				style={customStyles}
				contentLabel='Example Modal'
			>
				<button
					style={{
						border: 'none',
						background: 'transparent',
						position: 'absolute',
						top: '10px',
						right: '45px',
						fontSize: '40px',
					}}
					onClick={CloseModal}
				>
					<CgCloseO color={'#FFFFFF'} />
				</button>
				<br />
				<br />
				<br />
				<div
					style={{
						width: width > 800 ? '500px' : '100%',
						margin: 'auto',
						height: '600px',
						overflow: 'hidden',
						position: 'relative',
						right: '20px',
					}}
				>
					<Slider {...settings} ref={sliderRef}>
						{posts &&
							posts.map((post, index) => (
								<CardMarginWrapper>
									<CardWrapper>
										<CardImageWrapper src={post.media[0].mediaurl} />
										<DetailsWrapper>
											<LegendDetails>
												<div>
													{post.typeofday.map((element) => (
														<>
															<EventWrapper event={element} />
															&nbsp;
														</>
													))}
												</div>
												<CardRatingWrapper>
													{[...new Array(5)].map((elm, index) => {
														if (index < post.rating) {
															return <AiFillStar color={'#9DD0EB'} />;
														} else {
															return <AiFillStar color={'#D2D4D8'} />;
														}
													})}
												</CardRatingWrapper>
											</LegendDetails>
											<DescripWrapper>
												<h3
													style={{
														height: '10px',
													}}
												>
													{dateArray &&
														dateArray[index] &&
														dateArray[index].getDate()}{' '}
													{dateArray &&
														dateArray[index] &&
														MonthsFullForm[dateArray[index].getMonth()]}
												</h3>
												{truncate(post.text)}
											</DescripWrapper>
											<br />
											<ViewPostButton>View Full Post</ViewPostButton>
										</DetailsWrapper>
									</CardWrapper>
								</CardMarginWrapper>
							))}
					</Slider>
				</div>
			</Modal>
		</>
	);
}