import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import EventWrapper from './EventWrapper';
import { Month } from '../utils/constants';

const CellWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border: 0.2px solid rgb(230, 230, 230);
	text-align: center;
	font-size: 12px;
	position: relative;
`;

const ScrollDetails = styled.span`
	background: white;
	position: absolute;
	top: 1px;
`;

const ElementWrapper = styled.div`
	margin-top: 6px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 70%;
	width: 100%;
	@media (max-width: 700px) {
		margin-top: 0px;
		height: 80%;
	}
`;

const ImageWrapper = styled.img`
	width: 40%;
	height: 70%;
	@media (max-width: 1100px) {
		width: 80%;
	}
	@media (max-width: 700px) {
		width: 100% !important;
	}
`;

const EventContainer = styled.div`
	display: flex;
`;

const RatingWrapper = styled.div`
	font-size: 12px;
	@media (max-width: 700px) {
		font-size: 8px;
	}
`;

export default function Cell({
	columnIndex,
	rowIndex,
	style,
	data,
	isScrolling,
}) {
	const {
		setIsOpen,
		setCurrentYear,
		setCurrentMonth,
		currentMonth,
		posts,
		dateArray,
		setCurrentModalIndex,
	} = data;
	const [display, setDisplay] = useState(false);
	const [imgIndex, setImgIndex] = useState(null);

	useEffect(() => {
		const now = new Date(0);
		now.setDate(now.getDate() + (rowIndex - 1) * 7 + columnIndex + 3);
		if (now.getMonth() === 0) {
			setCurrentMonth(11);
			setCurrentYear(now.getFullYear() - 1);
		} else {
			setCurrentMonth(now.getMonth() - 1);
			setCurrentYear(now.getFullYear());
		}

		// eslint-disable-next-line array-callback-return
		let filteredArray = dateArray.filter((date, index) => {
			if (
				now.getDate() === date.getDate() &&
				now.getMonth() === date.getMonth() &&
				now.getFullYear() === date.getFullYear()
			) {
				setImgIndex(index);
				return true;
			}
		});

		if (filteredArray.length) {
			setDisplay(Boolean(filteredArray.length));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentMonth]);

	function handleClick(e) {
		setCurrentModalIndex(imgIndex);
		setIsOpen((prev) => !prev);
	}
	const now = new Date(0);
	now.setDate(now.getDate() + (rowIndex - 1) * 7 + columnIndex + 3);
	const weekEndDate = new Date(now);
	weekEndDate.setDate(weekEndDate.getDate() + 6);
	return (
		<>
			<CellWrapper
				style={{
					...style,
					backgroundColor:
						columnIndex === 0 ? 'rgba(0,0,0, 0.1)' : 'transparent',
					fontWeight: now.getMonth() === currentMonth ? 900 : 400,
				}}
			>
				{isScrolling ? (
					columnIndex === 0 && now.getDate() === 1 ? (
						<>
							<ScrollDetails>
								<b>
									{Month[now.getMonth()]} {now.getFullYear()}
								</b>
							</ScrollDetails>
							{now.getDate()}
						</>
					) : columnIndex === 0 &&
					  now.getDate() > weekEndDate.getDate() &&
					  (now.getMonth() < weekEndDate.getMonth() ||
							(now.getMonth() === 11 &&
								now.getMonth() > weekEndDate.getMonth())) ? (
						<>
							<ScrollDetails>
								<b>
									{now.getMonth() === 11
										? `${Month[(now.getMonth() + 1) % 12]} ${
												now.getFullYear() + 1
										  }`
										: `${
												Month[(now.getMonth() + 1) % 12]
										  } ${now.getFullYear()}`}
								</b>
							</ScrollDetails>
							{now.getDate()}
						</>
					) : (
						now.getDate()
					)
				) : (
					now.getDate()
				)}
				{display && imgIndex !== null && (
					<ElementWrapper onClick={handleClick}>
						<RatingWrapper>
							{[...new Array(5)].map((elm, index) => {
								if (index < posts[imgIndex].rating) {
									return <AiFillStar color={'#9DD0EB'} />;
								} else {
									return <AiFillStar color={'#D2D4D8'} />;
								}
							})}
						</RatingWrapper>
						<ImageWrapper src={posts[imgIndex].media[0].mediaurl} />
						<EventContainer>
							{posts[imgIndex].typeofday.map((element) => (
								<EventWrapper event={element} />
							))}
						</EventContainer>
					</ElementWrapper>
				)}
			</CellWrapper>
		</>
	);
}