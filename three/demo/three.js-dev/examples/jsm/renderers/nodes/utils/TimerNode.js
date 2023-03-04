import FloatNode from '../inputs/FloatNode.js';
import { NodeUpdateType } from '../core/constants.js';

class TimerNode extends FloatNode {

	static LOCAL = 'local';
	static GLOBAL = 'global';
	static DELTA = 'delta';

	constructor( scope = TimerNode.LOCAL ) {

		super();

		this.scope = scope;

		this.scale = 1;

		this.updateType = NodeUpdateType.Frame;

	}

	update( frame ) {

		const scope = this.scope;
		const scale = this.scale;

		if ( scope === TimerNode.LOCAL ) {

			this.value += frame.deltaTime * scale;

		} else if ( scope === TimerNode.DELTA ) {

			this.value = frame.deltaTime * scale;

		} else {

			// global

			this.value = frame.time * scale;

		}

	}

}

export default TimerNode;
