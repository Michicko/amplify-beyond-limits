import { IPlayer } from "./definitions";

interface IPos {
	position: string;
	players: IPlayer[];
}

const groupPlayersByPositions = (
	positionList: string[],
	players: IPlayer[],
) => {
	const rows: IPos[] = [];
	const positions = [...positionList];

	// group player by position
	players.forEach((player) => {
		const pos = rows.find((role) => role.position === player.position.long);
		if (!pos) {
			rows.push({
				position: player.position.long,
				players: [player],
			});
		} else {
			pos.players.push(player);
		}
	});

	// sort group according to the positions
	const playersByPositions = positions.map((el) => {
		const pos = rows.find(
			(col) => col.position.toLowerCase() === el.toLowerCase(),
		);
		if (pos) return pos;
		return el;
	});

	return playersByPositions;
};

export default groupPlayersByPositions;
