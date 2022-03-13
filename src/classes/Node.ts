import { NodeType } from '../@types/global';

interface Props {
	id: string | number;
	name: string;
	position: [number, number]
};

class Node implements NodeType {
	id: string | number;
	name: string;
	edgeList: NodeType[];
	position: [number, number];

	constructor({ id, name, position }: Props) {
		this.id = id;
		this.name = name;
		this.edgeList = [];
		this.position = position;
	}

	connect(node: NodeType): NodeType {
		this.edgeList.push(node);
		node.edgeList.push(this);

		return this;
	}

	isConnected(node: NodeType): boolean {
		return Boolean(this.edgeList.find(n => n.id === node.id));
	}

	getAdjacentNodes(): (string | number)[] {
		return this.edgeList.map(edge => edge.id);
	}

	getClosestNode(): NodeType | undefined {
		return this.edgeList[4] || this.edgeList[3] || this.edgeList[2] || this.edgeList[1] || this.edgeList[0];
	}
};

export default Node;