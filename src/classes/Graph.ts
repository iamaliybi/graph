import { GraphType, NodeType } from './../@types/global.d';

class Graph implements GraphType {
	nodes: NodeType[];
	ctx: CanvasRenderingContext2D;
	edgeList: [string | number, string | number][];

	constructor(ctx: CanvasRenderingContext2D) {
		this.nodes = [];
		this.ctx = ctx;
		this.edgeList = [];
	}

	addNode(node: NodeType): GraphType {
		this.nodes.push(node);
		return this;
	}

	removeNode(node: NodeType): GraphType {
		this.nodes = this.nodes.filter(n => node.id !== n.id);
		return this;
	}

	draw(): void {
		this.ctx.beginPath();
		const nodeValues = Object.values(this.nodes);

		// Line
		nodeValues.forEach(node => this.#createEdge(node));

		// Node
		nodeValues.forEach(node => this.#createNode(node));

		this.ctx.closePath();
	}

	lineTo(nodeA: NodeType, nodeB: NodeType): FrameRequestCallback | void {
		if (!nodeA.isConnected(nodeB)) {
			console.error('No way to ' + nodeB.id);
			return;
		}

		this.ctx.moveTo(nodeA.position[0] + 32, nodeA.position[1] + 32);
		this.ctx.lineTo(nodeB.position[0] + 32, nodeB.position[1] + 32);
		this.ctx.strokeStyle = 'rgb(0, 0, 0)';
		this.ctx.stroke();
	};

	/* Draw Nodes */
	#createNode(node: NodeType): void {
		const w = 64;
		const h = 64;
		const [x, y] = node.position;
		const r = node.position[0] + w;
		const b = node.position[1] + h;
		const radius = 8;

		this.ctx.beginPath();

		/* top-right */
		this.ctx.moveTo(x + radius, y);
		this.ctx.lineTo(r - radius, y);
		this.ctx.quadraticCurveTo(r, y, r, y + radius);

		/* bottom-right */
		this.ctx.lineTo(r, y + h - radius);
		this.ctx.quadraticCurveTo(r, b, r - radius, b);

		/* bottom-left */
		this.ctx.lineTo(x + radius, b);
		this.ctx.quadraticCurveTo(x, b, x, b - radius);

		/* top-left */
		this.ctx.lineTo(x, y + radius);
		this.ctx.quadraticCurveTo(x, y, x + radius, y);

		// Shape background
		this.ctx.fillStyle = 'rgb(0,150,136)';
		this.ctx.fill();

		// Shape name
		this.ctx.font = '32px Roboto';
		this.ctx.fillStyle = 'rgb(255, 255, 255)';
		this.ctx.fillText(node.name, x + (w / 2) - 11, y + (h / 2) + 12);
	}

	#createEdge(node: NodeType): void {
		node.edgeList.forEach(n => {
			if (this.edgeList.find(edge => (edge[0] === node.id || edge[1] === node.id) && (edge[0] === n.id || edge[1] === n.id))) return;

			this.edgeList.push([node.id, n.id]);

			this.ctx.moveTo(n.position[0] + 32, n.position[1] + 32);
			this.ctx.lineTo(node.position[0] + 32, node.position[1] + 32);
			this.ctx.strokeStyle = 'rgb(250, 250, 250)';
			this.ctx.stroke();
		});
	}
};

export default Graph;