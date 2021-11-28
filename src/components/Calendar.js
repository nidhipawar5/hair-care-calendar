import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FixedSizeGrid as Grid } from 'react-window';
import { useWindowSize } from '../hooks/useWindow';
import Cell from './Cell';
import ModalComponent from './Modal';
import { WeekDays } from '../utils/constants';

const CalendarWrapper = styled.div`
	width: 100%;
	height: 83vh;
`;

const DatesWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
`;

const HeaderRow = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 98.75%;
`;

const HeaderCell = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.2px solid rgb(230, 230, 230);
	font-weight: bold;
`;

export default function CalendarComponent({
	setCurrentYear,
	setCurrentMonth,
	currentMonth,
}) {
	const [width] = useWindowSize();
	const gridRef = useRef(null);
	const [posts, setPosts] = useState([]);
	const [dateArray, setDateArray] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [currentModalIndex, setCurrentModalIndex] = useState(0);

	useEffect(() => {
		fetch('http://devapi.quinn.care/graph', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				requestobjects: [
					{
						posts: {
							operationtype: 'read',
							id: {
								return: true,
							},
							userid: {
								searchvalues: ['41329663-5834-11eb-8e6e-3ca82abc3dd4'],
								return: true,
							},
							iscalendarentry: {
								searchvalues: ['true'],
								return: true,
							},
							media: {
								return: true,
							},
							rating: {
								return: true,
							},
							text: {
								return: true,
							},
							privacy: {
								searchvalues: [18],
								return: true,
							},
							typeofday: {
								return: true,
							},
							calendardatetime: {
								return: true,
								sort: 'descending',
							},
							maxitemcount: 50,
							continuationtoken: null,
						},
					},
				],
			}),
		})
			.then((result) => result.json())
			.then((data) => {
				setPosts(data.responseobjects[0].posts);
				let createdArray = data.responseobjects[0].posts.map(
					(data) => new Date(data.calendardatetime)
				);
				setDateArray(createdArray);
			});
	}, []);

	useEffect(() => {
		let currentTime = new Date();
		let currentOffset = currentTime.getTimezoneOffset();
		let ISTOffset = 330;
		let ISTTime = new Date(
			currentTime.getTime() + (ISTOffset + currentOffset) * 60000
		);
		let weekOffSet = Math.round(
			(ISTTime - new Date(1970, 1, 4)) / (7 * 24 * 60 * 60 * 1000)
		);
		gridRef.current.scrollToItem({
			columnIndex: 2,
			rowIndex: weekOffSet + 7,
		});
	}, []);

	return (
		<>
			<ModalComponent
				width={width}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				currentModalIndex={currentModalIndex}
				posts={posts}
				dateArray={dateArray}
			/>
			<CalendarWrapper>
				<HeaderRow>
					{WeekDays.map((day) => (
						<HeaderCell
							style={{
								height: '5vh',
							}}
						>
							{day}
						</HeaderCell>
					))}
				</HeaderRow>
				<DatesWrapper>
					<Grid
						useIsScrolling
						ref={gridRef}
						className='gridWrapper'
						columnCount={7}
						columnWidth={width / 7.1}
						height={600}
						rowCount={220000}
						rowHeight={110}
						width={width}
						itemData={{
							setCurrentMonth: setCurrentMonth,
							setCurrentYear: setCurrentYear,
							currentMonth: currentMonth,
							posts: posts,
							dateArray: dateArray,
							setCurrentModalIndex: setCurrentModalIndex,
							setIsOpen: setIsOpen,
							otherData: true,
						}}
					>
						{Cell}
					</Grid>
				</DatesWrapper>
			</CalendarWrapper>
		</>
	);
}