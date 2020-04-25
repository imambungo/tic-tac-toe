import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// it's called function component
// Flutter stateless widget equivalent (kinda)
function Square(props) {
	return (
		<button className="square"
		        onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		let squareIndex = 0;
		let squares = [];
		for (let i = 0; i < 3; ++i) {
			let squaresRow = [];
			for (let j = 0; j < 3; ++j) {
				squaresRow.push(this.renderSquare(squareIndex++));
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
}

function Toggle({value, onToggle}) {
	return <button onClick={onToggle}>{value}</button>
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
			ascending: true,
			toggleValue: 'descending',
		};
	}

	// i = number (0-8)
	// klik kotak, bukan jump to step
	handleClick = (i) => {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];

		                                // supaya tdk nge-mutate current.squares
		const squares = current.squares.slice();

		// jika sudah ada pemenangnya atau square-nya sudah di-klik
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState(state => ({
			history: history.concat([
				{
					         // squares current, dimana index ke-i sudah berisi
					squares: squares,
					tile: i
				}
			]),
			//            // ini history fungsi ini, bukan this.state
			//stepNumber: history.length,
			stepNumber: state.stepNumber + 1,
			xIsNext: !state.xIsNext,
		}));
	}

	// step = number
	jumpTo(step) {
		this.setState({
			// state updates are merged, no need to include history
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	onToggle = () => {
		console.log('cubo')
		this.setState(({ascending}) => ({
			ascending: !ascending,
			toggleValue: ascending ? 'ascending' : 'descending',
		}));
	}

	render() {
		// ingat, di dalam render kita cuma nge-render!
		// jangan nge-modify/mutate this.state
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		                                 // index
		let moves = history.map(({tile}, move) => {
			const col = (tile % 3) + 1;
			const row = Math.floor(tile / 3) + 1
			let desc = move ? `Go to move #${move} (${col},${row})`
			                : 'Go to game start';
			if (move === this.state.stepNumber) {
				desc = <b>{desc}</b>;
			}
			// key di bawah nggak ngefek?
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		});
		if (!this.state.ascending) {
			moves.reverse();
		}

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				{/*sebenarnya nggak perlu className game-board
					even more, tidak perlu div at all, langsung Board aja*/}
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={this.handleClick}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<Toggle
						value={this.state.toggleValue}
						onToggle={this.onToggle}
					/>
					{
						!this.state.ascending ? <ol reversed>{moves}</ol>
						                      : <ol>{moves}</ol>
					}
				</div>
			</div>
		);
	}
}

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
			return squares[a];
		}
	}
	return null;
}

// ========================================

// coba cek aplikasi react yg lain gini jg nggak
ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
