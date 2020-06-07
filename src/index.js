import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	const button = (
		<button className="square"
		        onClick={props.onClick}
		        style={props.highlight ? {backgroundColor: '#888'} : {}}
		>
			{props.value}
		</button>
	);
	return button;
}


function Board(props) {
	const renderSquare = i => {
		const {squares, onClick, winPattern} = props;
		return (
			<Square
			value={squares[i]}
			onClick={() => onClick(i)}
			highlight={
				winPattern && winPattern.indexOf(i) !== -1
			}
			/>
		);
	}

	let squareIndex = 0;
	let squares = [];
	for (let i = 0; i < 3; ++i) {
		let squaresRow = [];
		for (let j = 0; j < 3; ++j) {
			squaresRow.push(renderSquare(squareIndex++));
		}
		squares.push(
			<div className="board-row">
				{squaresRow}
			</div>
		);
	}
	return (
		<>
			{squares}
		</>
	);
}


function Toggle({value, onToggle}) {
	return <button onClick={onToggle}>{value}</button>
}

function Game(props) {
	const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [ascending, setAscending] = useState(true);
	const [toggleValue, setToggleValue] = useState('descending');

	/*
	 * squares = array dg panjang 9 (9 kotak)
	 * return pemenang ('X' atau 'O' atau null)
	 */
	const calculateWinner = (squares) => {
		const lines = [  // kombinasi menang
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let winPattern of lines) {
			const [a, b, c] = winPattern;

			// jika tidak null dan semuanya sama
			if (squares[a] && squares[a] === squares[b]
			               && squares[a] === squares[c])
			{
				return [squares[a], winPattern];
			}
		}
		return [null];
	}

	// i = number (0-8)
	// klik kotak, bukan jump to step
	const handleClick = (i) => {
		const slicedHistory = history.slice(0, stepNumber + 1);
		const current = slicedHistory[slicedHistory.length - 1];

		                                // supaya tdk nge-mutate current.squares
		const squares = current.squares.slice();

		// jika sudah ada pemenangnya atau square-nya sudah di-klik
		if (calculateWinner(squares)[0] || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? 'X' : 'O';
		setHistory(slicedHistory.concat([{
			squares: squares,
			tile: i
		}]));
		setStepNumber(prevStepNumber => prevStepNumber + 1);
		setXIsNext(prevXIsNext => !prevXIsNext);
	}

	// step = number
	const jumpTo = step => {
		setStepNumber(step);
		setXIsNext((step % 2) === 0);
	}

	const onToggle = () => {
		setAscending(prevAscending => !prevAscending);
		setToggleValue(ascending ? 'ascending' : 'descending');
	}

	const isTie = (squares) => {
		if (squares.some(tile => tile === null)) {
			return false;
		} else {
			// because isTie check comes after calculateWinner check
			return true;
		}
	}

	// ingat, di dalam render kita cuma nge-render!
	// jangan nge-modify/mutate this.state
	const current = history[stepNumber];
	const [winner, winPattern] = calculateWinner(current.squares);
	const tie = isTie(current.squares);

	                                 // index
	let moves = history.map(({tile}, move) => {
		const col = (tile % 3) + 1;
		const row = Math.floor(tile / 3) + 1
		let desc = move ? `Go to move #${move} (${col},${row})`
		                : 'Go to game start';
		if (move === stepNumber) {
			desc = <b>{desc}</b>;
		}
		// key di bawah nggak ngefek?
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>
					{desc}
				</button>
			</li>
		);
	});
	if (!ascending) {
		moves.reverse();
	}

	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else if (tie) {
		status = 'Draw';
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	return (
		<div className="game">
			{/*sebenarnya nggak perlu className game-board
				even more, tidak perlu div at all, langsung Board aja*/}
			<div className="game-board">
				<Board
					squares={current.squares}
					onClick={handleClick}
					winPattern={winPattern}
				/>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<Toggle
					value={toggleValue}
					onToggle={onToggle}
				/>
				{
					!ascending ? <ol reversed>{moves}</ol>
					           : <ol>{moves}</ol>
				}
			</div>
		</div>
	);
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
