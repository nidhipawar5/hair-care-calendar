import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EventBubble = styled.span`
	border-radius: 10px;
	padding: 4px;
	font-weight: 500;
	text-align: center;
	font-size: 12px;
	@media (max-width: 700px) {
		font-size: 8px;
	}
`;

export default function EventWrapper({ event }) {
	const [eventName, setEventName] = useState(null);
	const [eventColor, setEventColor] = useState(null);

	useEffect(() => {
		switch (event) {
			case 'protein treatment': {
				setEventName('Pr');
				setEventColor('#DDEBF1');
				break;
			}
			case 'hair cut': {
				setEventName('Cu');
				setEventColor('#F4DFEB');
				break;
			}
			case 'hair color': {
				setEventName('HC');
				setEventColor('#F4DFEB');
				break;
			}
			case 'deep conditioning': {
				setEventName('DC');
				setEventColor('#DDEBF1');
				break;
			}
			default: {
				setEventName('C');
				setEventColor('#F4DFEB');
				break;
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<EventBubble
			style={{
				backgroundColor: eventColor ? eventColor : 'transparent',
			}}
		>
			{eventName}
		</EventBubble>
	);
}