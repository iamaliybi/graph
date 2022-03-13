import { GraphType, NodeType } from "./@types/global";
import Graph from "./classes/Graph";
import Node from "./classes/Node";

/* Constants */
const width = window.innerWidth;
const height = window.innerHeight;
const loadingEl: HTMLElement | undefined = document.getElementById('loading');

const nodes: { [s: string]: NodeType } = {
	A: new Node({ id: 'A', name: 'A', position: [200, 500] }),
	B: new Node({ id: 'B', name: 'B', position: [500, 300] }),
	C: new Node({ id: 'C', name: 'C', position: [500, 700] }),
	D: new Node({ id: 'D', name: 'D', position: [800, 500] }),
	E: new Node({ id: 'E', name: 'E', position: [1100, 300] }),
	F: new Node({ id: 'F', name: 'F', position: [1100, 700] }),
	G: new Node({ id: 'G', name: 'G', position: [1400, 500] }),
}

/* Variables */
let canvas: HTMLCanvasElement | undefined;
let ctx: CanvasRenderingContext2D | undefined;
let graph: GraphType | undefined;

/* Funcs */
const init = (): void => {
	loadingEl?.remove();

	render();
	drawGraph();
};

const render = (): void => {
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = width;
	canvas.height = height;

	document.body.appendChild(canvas);
};

const drawGraph = (): void => {
	nodes.A.connect(nodes.B); // AB
	nodes.A.connect(nodes.C); // AC
	nodes.B.connect(nodes.D); // BD
	nodes.C.connect(nodes.D); // CD
	nodes.D.connect(nodes.E); // DE
	nodes.D.connect(nodes.F); // DF
	nodes.E.connect(nodes.G); // EG
	nodes.F.connect(nodes.G); // FG

	const G = new Graph(ctx);

	Object.values(nodes).forEach(node => {
		G.addNode(node);
	});

	G.draw();
	// G.lineTo(nodes.A, nodes.C);
};

/* START */
window.addEventListener('DOMContentLoaded', init);