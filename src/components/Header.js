import React from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Month } from '../utils/constants';

const Header = styled.header`
	height: 6vh;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28px;
	font-weight: 700;
	padding: 5px;
	@media (max-width: 700px) {
		font-size: 18px;
	}
`;

export default function HeaderComponent({ currentMonth, currentYear }) {
	return (
		<Header>
			<span>
				<AiOutlineArrowLeft />
				&nbsp;&nbsp;&nbsp;&nbsp;
				<span
					style={{
						color: '#66D8FD',
					}}
				>
					my
				</span>{' '}
				hair diary
			</span>
			<span
				style={{
					fontWeight: 400,
				}}
			>
				<b>{Month[currentMonth]}</b> {currentYear}
			</span>
		</Header>
	);
}