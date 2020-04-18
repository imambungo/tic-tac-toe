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
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
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
		};
	}

	// i = number (0-8)
	// klik kotak, bukan jump to step
	handleClick(i) {
		                                   //    0    sampai   stepNumber
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		                           // ingat! krn history isinya objek, maka yg
		                           // dicopy slice() adalah object reference

		                // elemen (objek berisi squares) terakhir history
		const current = history[history.length - 1];

		                                // supaya tdk nge-mutate current.squares
		const squares = current.squares.slice();

		// jika sudah ada pemenangnya atau square-nya sudah di-klik
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		     // as a reminder, setState nge-invoke render()
		this.setState(state => ({
			         // history yg sudah dibatasi dg stepNumber
			history: history.concat([
				{
					         // squares current, dimana index ke-i sudah berisi
					squares: squares,
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

	render() {
		// ingat, di dalam render kita cuma nge-render!
		// jangan nge-modify/mutate this.state
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		                                 // index
		const moves = history.map((step, move) => {
			const desc = move ? 'Go to move #' + move
			                  : 'Go to game start';  // move == 0
			// key di bawah nggak ngefek?
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		});

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
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
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
	for (let i = 0; i < lines.length; i++) {  // untuk setiap kombinasi
		const [a, b, c] = lines[i];

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
