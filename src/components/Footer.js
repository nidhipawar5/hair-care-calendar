import React from 'react';
import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { ImCalendar } from 'react-icons/im';
import { RiAccountCircleLine } from 'react-icons/ri';

const BottomNav = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 6vh;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 30px;
	background: white;
`;

export default function BottomNavComponent() {
	return (
		<BottomNav>
			<AiOutlineHome />
			<BsSearch />
			<GrAddCircle />
			<ImCalendar color={'#66D8FD'} />
			<RiAccountCircleLine />
		</BottomNav>
	);
}