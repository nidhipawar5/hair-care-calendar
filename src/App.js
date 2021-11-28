import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderComponent from "./components/Header";
import CalendarComponent from './components/Calendar';
import FooterComponent from './components/Footer';

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
    </div>
  );
}

export default App;
