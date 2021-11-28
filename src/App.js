import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderComponent from "./components/Header";
import CalendarComponent from './components/Calendar';
import FooterComponent from './components/Footer';
import { MdAdd } from 'react-icons/md';

const FloatButton = styled.button`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	text-align: center;
	position: absolute;
	bottom: 80px;
	right: 20px;
	border: none;
	background: #66d8fd;
	font-size: 40px;
	display: flex;
	align-items: center;
	color: white !important;
`;

function App() {
  const [currentMonth, setCurrentMonth] = useState(0);
	const [currentYear, setCurrentYear] = useState(0);

  return (
    <div className="App">
      <HeaderComponent currentMonth={currentMonth} currentYear={currentYear} />
      <CalendarComponent
				currentMonth={currentMonth}
				setCurrentMonth={setCurrentMonth}
				setCurrentYear={setCurrentYear}
			/>
      <FooterComponent/>
      <FloatButton>
				<MdAdd />
			</FloatButton>
    </div>
  );
}

export default App;
