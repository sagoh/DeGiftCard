import React from 'react';
import './MintButton.css';

interface MintButtonProps {
	text: string;
	onClick: Function;
	onClickParams?: any;
	isDisabled?: boolean;
}

export default function MintButton(props: MintButtonProps) {
	return (
		<button
			className='button'
			onClick={() => props.onClick(props.onClickParams)}
			disabled={props.isDisabled}>
			{props.isDisabled ? (
				<div className='loader' />
			) : (
				<span>{props.text}</span>
			)}
		</button>
	);
}
