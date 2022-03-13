export interface NodeType {
	id: string | number;
	name: string;
	edgeList: NodeType[];
	position: [number, number]

	connect(node: NodeType): NodeType;

	isConnected(node: NodeType): boolean;

	getAdjacentNodes(): (string | number)[];

	getClosestNode(not?: NodeType): NodeType | undefined
}

export interface GraphType {
	nodes: NodeType[];
	ctx: CanvasRenderingContext2D;
	edgeList: [string | number, string | number][];

	addNode(node: NodeType): GraphType;

	removeNode(node: NodeType): GraphType;

	draw(): void

	lineTo(nodeA: NodeType, nodeB: NodeType): FrameRequestCallback | void
}