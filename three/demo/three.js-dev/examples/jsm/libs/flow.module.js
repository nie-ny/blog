/**
 * https://github.com/sunag/flow
 */

function __flow__addCSS( css ) {

	try {

		const style = document.createElement( 'style' );

		style.setAttribute( 'type', 'text/css' );
		style.innerHTML = css;
		document.head.appendChild( style );

	} catch( e ) {}

}

__flow__addCSS( `@keyframes f-animation-open { 0% { transform: scale(.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; }}f-canvas,f-canvas canvas { position: absolute; top: 0; left: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-touch-callout: none; }f-canvas { overflow: auto; cursor: grab;}f-canvas canvas.front { z-index: 10;}body.dragging f-canvas,body.connecting f-canvas { overflow: hidden !important;}body.dragging *:not(.drag) { pointer-events: none !important;}f-canvas.grabbing * { cursor: grabbing; user-select: none;}f-canvas canvas { position: fixed; overflow: hidden; pointer-events: none;}f-canvas::-webkit-scrollbar { width: 8px; height: 8px;}f-canvas::-webkit-scrollbar-thumb:hover{ background: #014fc5;}f-canvas::-webkit-scrollbar-track { background: #363636;}f-canvas::-webkit-scrollbar-thumb { background-color: #666666; border-radius: 10px; border: 0;}f-canvas f-content,f-canvas f-area { position: absolute; display: block;}f-node { position: absolute; margin: 0; padding: 0; user-select: none; width: 320px; z-index: 1; cursor: auto; filter: drop-shadow(0 0 10px #00000061); backdrop-filter: blur(4px);}f-node.selected { z-index: 2;}f-node.selected,f-canvas.dragging-rio f-node:hover,f-canvas.dragging-lio f-node:hover { filter: drop-shadow(0 0 10px #00000061) drop-shadow(0 0 8px #4444dd);}f-node.closed f-element:not(:first-child) { display: none;}f-node.center { top: 50%; left: 50%; transform: translate( -50%, -50% );}f-node.top-right { top: 0; right: 0;}f-node.top-center { top: 0; left: 50%; transform: translateX( -50% );}f-node.top-left { top: 0; left: 0;}f-node { transition: filter 0.2s ease;}f-node { animation: .2s f-animation-open 1 alternate ease-out;}f-drop,f-menu,f-menu button,f-element,f-element input,f-element select,f-element button,f-element textarea { font-family: 'Open Sans', sans-serif; font-size: 13px; text-transform: capitalize; color: #eeeeee; outline: solid 0px #000; letter-spacing: .2px; margin: 0; padding: 0; border: 0; user-select: none; -webkit-tap-highlight-color: transparent; transition: background 0.2s ease;}f-element input { transition: background 0.1s ease;}f-element input,f-element select,f-element button,f-element textarea { background-color: #242427;}f-element { position: relative; width: calc( 100% - 14px ); background: rgba(45, 45, 48, 0.95); pointer-events: auto; border-bottom: 2px solid #232323; display: flex; padding-left: 7px; padding-right: 7px; padding-top: 2px; padding-bottom: 2px;}f-element { height: 24px;}f-element input { margin-top: 2px; margin-bottom: 2px; box-shadow: inset 0px 1px 1px rgb(0 0 0 / 20%), 0px 1px 0px rgb(255 255 255 / 5%); margin-left: 2px; margin-right: 2px; width: 100%; padding-left: 4px; padding-right: 4px;}f-element input.number { cursor: col-resize;}f-element input:focus[type='text'], f-element input:focus[type='range'], f-element input:focus[type='color'] { background: rgba( 0, 0, 0, 0.6 ); outline: solid 1px rgba( 0, 80, 200, 0.98 );}f-element input[type='color'] { appearance: none; padding: 0; margin-left: 2px; margin-right: 2px; height: calc( 100% - 4px ); margin-top: 2px; border: none; }f-element input[type='color']::-webkit-color-swatch-wrapper { padding: 2px;}f-element input[type='color']::-webkit-color-swatch { border: none; cursor: alias;}f-element input[type='range'] { appearance: none; width: 100%; overflow: hidden; padding: 0; cursor: ew-resize;}f-element input[type='range']::-webkit-slider-runnable-track { appearance: none; height: 10px; color: #13bba4; margin: 0;}f-element input[type='range']::-webkit-slider-thumb { appearance: none; width: 0; background: #434343; box-shadow: -500px 0 0 500px rgba( 0, 120, 255, 0.98 ); border-radius: 50%; border: 0 !important;}f-element input[type='range']::-webkit-slider-runnable-track { margin-left: -4px; margin-right: -5px;}f-element input[type='checkbox'] { appearance: none; cursor: pointer;}f-element input[type='checkbox'].toggle { height: 20px; width: 45px; border-radius: 16px; display: inline-block; position: relative; margin: 0; margin-top: 2px; background: linear-gradient( 0deg, #292929 0%, #0a0a0ac2 100% ); transition: all 0.2s ease;}f-element input[type='checkbox'].toggle:after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: white; box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2); transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);}f-element input[type='checkbox'].toggle:checked { background: linear-gradient( 0deg, #0177fb 0%, #0177fb 100% );}f-element input[type='checkbox'].toggle:checked:after { transform: translatex(25px);}f-element.auto-height { display: table;}f-element textarea { width: calc( 100% - 18px ); padding-top: 1px; padding-bottom: 3px; padding-left: 3px; padding-right: 8px; margin-top: 2px; margin-left: 2px; height: calc( 100% - 8px ); max-height: 300px; border-radius: 2px; resize: none; box-shadow: inset 0px 1px 1px rgb(0 0 0 / 20%), 0px 1px 0px rgb(255 255 255 / 5%);}f-element.auto-height textarea { resize: auto;}f-element select { width: 100%; margin-top: 2px; margin-bottom: 2px; margin-left: 2px; margin-right: 2px; padding-left: 5px; cursor: pointer; box-shadow: inset 0px 1px 1px rgb(0 0 0 / 20%), 0px 1px 0px rgb(255 255 255 / 5%);}f-element f-toolbar { position: absolute; display: flex; top: 0; width: 100%; height: 100%; align-content: space-around;}f-element.output-right f-toolbar { right: 7px; float: right; justify-content: end;}f-element f-toolbar { margin-top: auto; margin-bottom: auto; margin-left: 3px; margin-right: 3px; font-size: 18px; line-height: 18px;}f-element f-toolbar button { opacity: .7; cursor: pointer; font-size: 14px; width: unset; height: unset; border-radius: unset; border: unset; outline: 0; background-color: unset; box-shadow: unset;}f-element f-toolbar button:hover,f-element f-toolbar button:active { opacity: 1; border: 0; background-color: unset;}f-element input.range-value { width: 60px; text-align: center;}f-menu.context button,f-element button { width: 100%; height: calc( 100% - 4px ); margin-left: 2px; margin-right: 2px; margin-top: 2px; border-radius: 3px; cursor: pointer;}f-element button { box-shadow: inset 1px 1px 1px 0 rgb(255 255 255 / 17%), inset -2px -2px 2px 0 rgb(0 0 0 / 26%);}f-element button:hover { color: #fff; background-color: #2a2a2a;}f-element button:active { border: 1px solid rgba( 0, 120, 255, 0.98 );}f-element f-inputs,f-element f-subinputs { display: flex; width: 100%;}f-element f-inputs { left: 100px; top: 50%; transform: translateY(-50%); position: absolute; width: calc( 100% - 106px ); height: calc( 100% - 4px ); z-index: 1;}f-element.inputs-disable f-inputs { filter: grayscale(100%); opacity: .5;}f-element.inputs-disable f-inputs input { pointer-events: none;}f-element f-label,f-element span { margin: auto; text-shadow: 1px 1px 0px #0007;}f-element f-label { padding-left: 4px; white-space: nowrap; position: absolute; top: 50%; transform: translateY(-50%); width: calc( 100% - 20px );}f-element.right f-label { text-align: right;}f-element f-label i { float: left; font-size: 18px; margin-right: 6px;}f-element f-label.center { width: 100%; text-align: center; display: block;}f-element.title { height: 29px; background-color: #3a3a3ab0; background-color: #3b3b43ed; cursor: all-scroll; border-top-left-radius: 6px; border-top-right-radius: 6px;}f-element.blue { background-color: #014fc5;}f-element.red { background-color: #bd0b0b;}f-element.green { background-color: #148d05;}f-element.yellow { background-color: #d6b100;}f-element.title.left { text-align: left; display: inline-grid; justify-content: start;}f-element.title span { text-align: center; font-size: 15px; padding-top: 2px;}f-element.title i { font-size: 18px; position: absolute; right: 10px; top: 50%; transform: translateY(-50%); opacity: .5;}f-element.output-right.title i { left: 10px; right: unset;}f-element.title.left span { text-align: left;}f-element f-io { border: 2px solid #dadada; width: 7px; height: 7px; position: absolute; background: #242427; border-radius: 8px; float: left; left: -7px; top: calc( 50% - 5px ); cursor: alias; box-shadow: 0 0 3px 2px #0000005e; z-index: 1;}f-element f-io.connect,f-canvas.dragging-rio f-element:hover f-io.lio,f-canvas.dragging-lio f-element:hover f-io.rio { border: 2px solid #0177fb; zoom: 1.4;}f-node.io-connect f-io:not(.connect) { border: 2px solid #dadada !important; zoom: 1 !important;}f-element f-io.rio { float: right; right: -7px; left: unset;}f-element f-disconnect { position: absolute; left: -35px; top: 50%; font-size: 22px; transform: translateY( -50% ); filter: drop-shadow(0 0 5px #000); text-shadow: 0px 0px 5px black; cursor: pointer;}f-element.output-right f-disconnect { right: -35px; left: unset;}f-element f-disconnect:hover { color: #ff3300;}f-element textarea::-webkit-scrollbar { width: 6px;}f-element textarea::-webkit-scrollbar-track { background: #111; } f-element textarea::-webkit-scrollbar-thumb { background: #0177fb; }f-element textarea::-webkit-scrollbar-thumb:hover { background: #1187ff; }f-element.small { height: 18px;}f-element.large { height: 36px;}body.connecting f-node:not(.io-connect) f-element:hover,f-element.select { background-color: rgba(61, 70, 82, 0.98);}f-drop { width: 100%; height: 100%; position: sticky; left: 0; top: 0; background: #02358417; text-align: center; justify-content: center; align-items: center; display: flex; box-shadow: inset 0 0 20px 10px #464ace17; pointer-events: none; transition: all .07s; opacity: 0; visibility: hidden;}f-drop.visible { visibility: unset; opacity: unset; transition: all .23s;}f-drop span { opacity: .5; font-size: 40px; text-shadow: 0px 0px 5px #000; font-weight: bold;}f-tooltip { pointer-events: none;}f-tooltip { position: absolute; left: 0; top: 0; background: rgba(0,0,0,.8); backdrop-filter: blur(4px); font-size: 14px; padding: 7px; border-radius: 10px; top: 50%; transform: translateY(-50%); visibility: hidden; pointer-events: none; opacity: 0; transition: all 0.3s ease; z-index: 150; white-space: nowrap;}f-menu.context { position: absolute; width: 170px; padding: 2px; margin: 0; background: #17171794; z-index: 110; font-size: 12px; border-radius: 6px; backdrop-filter: blur(6px); border: 1px solid #7e7e7e45; box-shadow: 3px 3px 6px rgba(0,0,0,.2); transition: opacity 0.2s ease, transform 0.1s ease;}f-menu.context.hidden { visibility: hidden; opacity: 0;}f-menu.context f-item { display: block; position: relative; margin: 0; padding: 0; white-space: nowrap;}f-menu.context f-item.submenu::after { content: ""; position: absolute; right: 6px; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); border: 5px solid transparent; border-left-color: #808080;}f-menu.context f-item:hover > f-menu,f-menu.context f-item.active > f-menu { visibility: unset; transform: unset; opacity: unset;}f-menu.context f-menu { top: 0px; left: calc( 100% - 4px );}f-menu.context f-item button { overflow: visible; display: block; width: calc( 100% - 6px ); text-align: left; cursor: pointer; white-space: nowrap; padding: 6px 8px; border-radius: 3px; background: #2d2d32; border: 0; color: #ddd; margin: 3px; text-shadow: 1px 1px 0px #0007;}f-menu.context f-item button i { float: left; font-size: 16px;}f-menu.context f-item button span { margin-left: 6px;}f-menu.context f-item:hover > button,f-menu.context f-item.active > button { color: #fff; background: #313136;}f-menu.context f-item button:active { outline: solid 1px rgba( 0, 80, 200, 0.98 );}f-menu.context f-item f-tooltip { margin-left: 120px;}f-menu.circle { position: absolute; left: 30px; top: 30px; z-index: 100;}f-menu.circle f-item { display: flex; justify-content: end; align-content: space-around; margin-bottom: 12px;}f-menu.circle f-item button { width: 50px; height: 50px; font-size: 26px; background: #17171794; border-radius: 50%; backdrop-filter: blur(6px); border: 1px solid #7e7e7e45; line-height: 100%; cursor: pointer; box-shadow: 3px 3px 6px rgba(0,0,0,.2);}f-menu.circle f-item f-tooltip { margin-left: 50px;}.f-rounded f-node f-element,.f-rounded f-node f-element.title.left { border-radius: 10px 5px 10px 5px;}.f-rounded f-node f-element input, .f-rounded f-node f-element select,.f-rounded f-node f-element button,.f-rounded f-node f-element textarea,.f-rounded f-node f-element input[type='checkbox'].toggle,.f-rounded f-node f-element input[type='checkbox'].toggle:after { border-radius: 20px 10px;}.f-rounded f-node f-element input { padding-left: 7px; padding-right: 7px;}.f-rounded f-menu.context,.f-rounded f-menu.context f-item button { border-radius: 20px 10px;}@media (hover: hover) and (pointer: fine) { f-node:not(.selected):hover { filter: drop-shadow(0 0 6px #66666630); } f-element f-toolbar { visibility: hidden; opacity: 0; transition: opacity 0.2s ease; } f-node:hover > f-element f-toolbar { visibility: visible; opacity: 1; } f-element f-io:hover { border: 2px solid #0177fb; zoom: 1.4; } f-menu.circle f-item button:hover { background-color: #2a2a2a; } f-menu.circle f-item button:hover > f-tooltip, f-menu.context f-item button:hover > f-tooltip { visibility: visible; transform: translate(10px, -50%); opacity: 1; } f-menu.circle f-item button:focus > f-tooltip, f-menu.context f-item button:focus > f-tooltip { visibility: hidden; opacity: 0; }}f-canvas { will-change: top, left;}f-node { will-change: transform !important;}` );

const REVISION = '1';

const Styles = {
	icons: {
		close: '',
		unlink: ''
	}
};

let _id = 0;

class Serializer extends EventTarget {

	constructor() {

		super();

		this._id = _id ++;

		this._serializable = true;

	}

	get id() {

		return this._id;

	}

	setSerializable( value ) {

		this._serializable = value;

		return this;

	}

	getSerializable() {

		return this._serializable;

	}

	serialize( /*data*/ ) {

		console.warn( 'Serializer: Abstract function.' );

	}

	deserialize( /*data*/ ) {

		console.warn( 'Serializer: Abstract function.' );

	}

	toJSON( data = null ) {

		let object = null;

		const id = this.id;

		if ( data !== null ) {

			const objects = data.objects;

			object = objects[ id ];

			if ( object === undefined ) {

				object = { objects };

				this.serialize( object );

				delete object.objects;

				objects[ id ] = object;

			}

		} else {

			object = { objects: {} };

			this.serialize( object );

		}

		object.id = id;
		object.type = this.constructor.name;

		return object;

	}

}

const draggableDOM = ( dom, callback = null, className = 'dragging' ) => {

	let dragData = null;

	const getZoom = () => {

		let zoomDOM = dom;

		while ( zoomDOM && zoomDOM !== document ) {

			const zoom = zoomDOM.style.zoom;

			if ( zoom ) {

				return Number( zoom );

			}

			zoomDOM = zoomDOM.parentNode;

		}

		return 1;

	};

	const onMouseDown = ( e ) => {

		const event = e.touches ? e.touches[ 0 ] : e;

		e.stopImmediatePropagation();

		dragData = {
			client: { x: event.clientX, y: event.clientY },
			delta: { x: 0, y: 0 },
			start: { x: dom.offsetLeft, y: dom.offsetTop },
			dragging: false,
			isTouch: !! e.touches
		};

		window.addEventListener( 'mousemove', onGlobalMouseMove );
		window.addEventListener( 'mouseup', onGlobalMouseUp );

		window.addEventListener( 'touchmove', onGlobalMouseMove );
		window.addEventListener( 'touchend', onGlobalMouseUp );

	};

	const onGlobalMouseMove = ( e ) => {

		const { start, delta, client } = dragData;

		const event = e.touches ? e.touches[ 0 ] : e;

		const zoom = getZoom();

		delta.x = ( event.clientX - client.x ) / zoom;
		delta.y = ( event.clientY - client.y ) / zoom;

		dragData.x = start.x + delta.x;
		dragData.y = start.y + delta.y;

		if ( dragData.dragging === true ) {

			if ( callback !== null ) {

				callback( dragData );

			} else {

				dom.style.cssText += `; left: ${ dragData.x }px; top: ${ dragData.y }px;`;

			}

			e.stopImmediatePropagation();

		} else {

			if ( Math.abs( delta.x ) > 2 || Math.abs( delta.y ) > 2 ) {

				dragData.dragging = true;

				dom.classList.add( 'drag' );

				if ( className ) document.body.classList.add( className );

				e.stopImmediatePropagation();

			}

		}

	};

	const onGlobalMouseUp = ( e ) => {

		e.stopImmediatePropagation();

		dom.classList.remove( 'drag' );

		if ( className ) document.body.classList.remove( className );

		window.removeEventListener( 'mousemove', onGlobalMouseMove );
		window.removeEventListener( 'mouseup', onGlobalMouseUp );

		window.removeEventListener( 'touchmove', onGlobalMouseMove );
		window.removeEventListener( 'touchend', onGlobalMouseUp );

		if ( callback === null ) {

			dom.removeEventListener( 'mousedown', onMouseDown );
			dom.removeEventListener( 'touchstart', onMouseDown );

		}

		dragData.dragging = false;

		if ( callback !== null ) {

			callback( dragData );

		}

	};

	if ( dom instanceof Event ) {

		const e = dom;
		dom = e.target;

		onMouseDown( e );

	} else {

		dom.addEventListener( 'mousedown', onMouseDown );
		dom.addEventListener( 'touchstart', onMouseDown );

	}

};

const dispatchEventList = ( list, ...params ) => {

	for ( const callback of list ) {

		callback( ...params );

	}

};

const toPX = ( val ) => {

	if ( isNaN( val ) === false ) {

		val = `${ val }px`;

	}

	return val;

};

const toHex = ( val ) => {

	if ( isNaN( val ) === false ) {

		val = `#${ val.toString( 16 ).padStart( 6, '0' ) }`;

	}

	return val;

};

var Utils = /*#__PURE__*/Object.freeze({
	__proto__: null,
	draggableDOM: draggableDOM,
	dispatchEventList: dispatchEventList,
	toPX: toPX,
	toHex: toHex
});

class Link {

	constructor( inputElement = null, outputElement = null ) {

		this.inputElement = inputElement;
		this.outputElement = outputElement;

	}

	get lioElement() {

		if ( Link.InputDirection === 'left' ) {

			return this.outputElement;

		} else {

			return this.inputElement;

		}

	}

	get rioElement() {

		if ( Link.InputDirection === 'left' ) {

			return this.inputElement;

		} else {

			return this.outputElement;

		}

	}

}

//Link.InputDirection = 'right';
Link.InputDirection = 'left';

let selected = null;

class Element extends Serializer {

	constructor( draggable = false ) {

		super();

		const dom = document.createElement( 'f-element' );
		dom.element = this;

		const onSelect = ( e ) => {

			let element = this;

			if ( e.changedTouches && e.changedTouches.length > 0 ) {

				const touch = e.changedTouches[ 0 ];

				let overDOM = document.elementFromPoint( touch.clientX, touch.clientY );

				while ( overDOM && ( ! overDOM.element || ! overDOM.element.isElement ) ) {

					overDOM = overDOM.parentNode;

				}

				element = overDOM ? overDOM.element : null;

			}

			selected = element;

		};

		if ( draggable === false ) {

			dom.ontouchstart = dom.onmousedown = ( e ) => {

				e.stopPropagation();

			};

		}

		dom.addEventListener( 'mouseup', onSelect, true );
		dom.addEventListener( 'touchend', onSelect );

		this.inputs = [];

		this.links = [];

		this.dom = dom;

		this.lioLength = 0;
		this.rioLength = 0;

		this.events = {
			'connect': [],
			'connectChildren': []
		};

		this.node = null;

		this.style = '';

		this.extra = null;

		this.enabledInputs = true;

		this.visible = true;

		this.inputsDOM = dom;

		this.disconnectDOM = null;

		this.lioDOM = this._createIO( 'lio' );
		this.rioDOM = this._createIO( 'rio' );

		this.dom.classList.add( `output-${ Link.InputDirection }` );

		this.dom.appendChild( this.lioDOM );
		this.dom.appendChild( this.rioDOM );

		this.addEventListener( 'connect', ( ) => {

			dispatchEventList( this.events.connect, this );

		} );

		this.addEventListener( 'connectChildren', ( ) => {

			dispatchEventList( this.events.connectChildren, this );

		} );

	}

	onConnect( callback, childrens = false ) {

		this.events.connect.push( callback );

		if ( childrens ) {

			this.events.connectChildren.push( callback );

		}

		return this;

	}

	setExtra( value ) {

		this.extra = value;

		return this;

	}

	getExtra() {

		return this.extra;

	}

	setVisible( value ) {

		this.visible = value;

		this.dom.style.display = value ? '' : 'none';

		return this;

	}

	getVisible() {

		return this.visible;

	}

	setEnabledInputs( value ) {

		const dom = this.dom;

		if ( !this.enabledInputs ) dom.classList.remove( 'inputs-disable');

		if ( !value ) dom.classList.add( 'inputs-disable' );

		this.enabledInputs = value;

		return this;

	}

	getEnabledInputs() {

		return this.enabledInputs;

	}

	setStyle( style ) {

		const dom = this.dom;

		if ( this.style ) dom.classList.remove( this.style );

		if ( style ) dom.classList.add( style );

		this.style = style;

		return this;

	}

	setInput( length ) {

		if ( Link.InputDirection === 'left' ) {

			return this.setLIO( length );

		} else {

			return this.setRIO( length );

		}

	}

	setOutput( length ) {

		if ( Link.InputDirection === 'left' ) {

			return this.setRIO( length );

		} else {

			return this.setLIO( length );

		}

	}

	get inputLength() {

		if ( Link.InputDirection === 'left' ) {

			return this.lioLength;

		} else {

			return this.rioLength;

		}

	}

	get outputLength() {

		if ( Link.InputDirection === 'left' ) {

			return this.rioLength;

		} else {

			return this.lioLength;

		}

	}

	setLIO( length ) {

		this.lioLength = length;

		this.lioDOM.style.visibility = length > 0 ? '' : 'hidden';

		return this;

	}

	setRIO( length ) {

		this.rioLength = length;

		this.rioDOM.style.visibility = length > 0 ? '' : 'hidden';

		return this;

	}

	add( input ) {

		this.inputs.push( input );

		input.element = this;

		this.inputsDOM.appendChild( input.dom );

		return this;

	}

	setHeight( val ) {

		this.dom.style.height = toPX( val );

		return this;

	}

	getHeight() {

		return this.dom.style.height;

	}

	connect( element = null ) {

		if ( this.disconnectDOM !== null ) {

			// remove the current input

			this.disconnectDOM.dispatchEvent( new Event( 'disconnect' ) );

		}

		if ( element !== null ) {

			const link = new Link( this, element );

			this.links.push( link );

			if ( this.disconnectDOM === null ) {

				this.disconnectDOM = document.createElement( 'f-disconnect' );
				this.disconnectDOM.innerHTML = Styles.icons.unlink ? `<i class='${ Styles.icons.unlink }'></i>` : '✖';

				this.dom.appendChild( this.disconnectDOM );

				const onDisconnect = () => {

					this.links = [];
					this.dom.removeChild( this.disconnectDOM );

					this.disconnectDOM.removeEventListener( 'mousedown', onClick, true );
					this.disconnectDOM.removeEventListener( 'touchstart', onClick, true );
					this.disconnectDOM.removeEventListener( 'disconnect', onDisconnect, true );

					element.removeEventListener( 'connect', onConnect );
					element.removeEventListener( 'connectChildren', onConnect );
					element.removeEventListener( 'nodeConnect', onConnect );
					element.removeEventListener( 'nodeConnectChildren', onConnect );
					element.removeEventListener( 'dispose', onDispose );

					this.disconnectDOM = null;

				};

				const onConnect = ( e ) => {

					this.dispatchEvent( new Event( 'connectChildren' ) );

				};

				const onDispose = () => {

					this.connect();

				};

				const onClick = ( e ) => {

					e.stopPropagation();

					this.connect();

				};

				this.disconnectDOM.addEventListener( 'mousedown', onClick, true );
				this.disconnectDOM.addEventListener( 'touchstart', onClick, true );
				this.disconnectDOM.addEventListener( 'disconnect', onDisconnect, true );
				element.addEventListener( 'connect', onConnect );
				element.addEventListener( 'connectChildren', onConnect );
				element.addEventListener( 'nodeConnect', onConnect );
				element.addEventListener( 'nodeConnectChildren', onConnect );
				element.addEventListener( 'dispose', onDispose );

			}

		}

		this.dispatchEvent( new Event( 'connect' ) );

		return this;

	}

	dispose() {

		this.dispatchEvent( new Event( 'dispose' ) );

	}

	serialize( data ) {

		const height = this.getHeight();

		const inputs = [];
		const links = [];

		for ( const input of this.inputs ) {

			inputs.push( input.toJSON( data ).id );

		}

		for ( const link of this.links ) {

			if ( link.inputElement !== null && link.outputElement !== null ) {

				links.push( link.outputElement.toJSON( data ).id );

			}

		}

		if ( this.inputLength > 0 ) data.inputLength = this.inputLength;
		if ( this.outputLength > 0 ) data.outputLength = this.outputLength;

		if ( inputs.length > 0 ) data.inputs = inputs;
		if ( links.length > 0 ) data.links = links;

		if ( this.style !== '' ) {

			data.style = this.style;

		}

		if ( height !== '' ) {

			data.height = height;

		}

	}

	deserialize( data ) {

		if ( data.inputLength !== undefined ) this.setInput( data.inputLength );
		if ( data.outputLength !== undefined ) this.setOutput( data.outputLength );

		if ( data.inputs !== undefined ) {

			const inputs = this.inputs;

			if ( inputs.length > 0 ) {

				let index = 0;

				for ( const id of data.inputs ) {

					data.objects[ id ] = inputs[ index ++ ];

				}

			} else {

				for ( const id of data.inputs ) {

					this.add( data.objects[ id ] );

				}

			}

		}

		if ( data.links !== undefined ) {

			for ( const id of data.links ) {

				this.connect( data.objects[ id ] );

			}

		}

		if ( data.style !== undefined ) {

			this.setStyle( data.style );

		}

		if ( data.height !== undefined ) {

			this.setHeight( data.height );

		}

	}

	get linkedExtra() {

		const linkedElement = this.linkedElement;

		return linkedElement ? linkedElement.getExtra() : null;

	}

	get linkedElement() {

		const link = this.link;

		return link ? link.outputElement : null;

	}

	get link() {

		return this.links[ 0 ];

	}

	_createIO( type ) {

		const { dom } = this;

		const ioDOM = document.createElement( 'f-io' );
		ioDOM.style.visibility = 'hidden';
		ioDOM.className = type;

		const onConnectEvent = ( e ) => {

			e.preventDefault();

			e.stopPropagation();

			selected = null;

			const nodeDOM = this.node.dom;

			nodeDOM.classList.add( 'io-connect' );

			ioDOM.classList.add( 'connect' );
			dom.classList.add( 'select' );

			const defaultOutput = Link.InputDirection === 'left' ? 'lio' : 'rio';

			const link = type === defaultOutput ? new Link( this ) : new Link( null, this );

			this.links.push( link );

			draggableDOM( e, ( data ) => {

				if ( data.dragging === false ) {

					nodeDOM.classList.remove( 'io-connect' );

					ioDOM.classList.remove( 'connect' );
					dom.classList.remove( 'select' );

					this.links.splice( this.links.indexOf( link ), 1 );

					if ( selected !== null ) {

						if ( type === defaultOutput ) {

							link.outputElement = selected;

						} else {

							link.inputElement = selected;

						}

						// check if is an is circular link

						if ( link.outputElement.node.isCircular( link.inputElement.node ) ) {

							return;

						}

						//

						if ( link.inputElement.inputLength > 0 && link.outputElement.outputLength > 0 ) {

							link.inputElement.connect( link.outputElement );

						}

					}

				}

			}, 'connecting' );

		};

		ioDOM.addEventListener( 'mousedown', onConnectEvent, true );
		ioDOM.addEventListener( 'touchstart', onConnectEvent, true );

		return ioDOM;

	}

}

Element.prototype.isElement = true;

class Input extends Serializer {

	constructor( dom ) {

		super();

		this.dom = dom;

		this.element = null;

		this.extra = null;

		this.events = {
			'change': [],
			'click': []
		};

		this.addEventListener( 'change', ( ) => {

			dispatchEventList( this.events.change, this );

		} );

		this.addEventListener( 'click', ( ) => {

			dispatchEventList( this.events.click, this );

		} );

	}

	setExtra( value ) {

		this.extra = value;

		return this;

	}

	getExtra() {

		return this.extra;

	}

	setToolTip( text ) {

		const div = document.createElement( 'f-tooltip' );
		div.innerText = text;

		this.dom.appendChild( div );

		return this;

	}

	onChange( callback ) {

		this.events.change.push( callback );

		return this;

	}

	onClick( callback ) {

		this.events.click.push( callback );

		return this;

	}

	setValue( value, dispatch = true ) {

		this.dom.value = value;

		if ( dispatch ) this.dispatchEvent( new Event( 'change' ) );

		return this;

	}

	getValue() {

		return this.dom.value;

	}

	serialize( data ) {

		data.value = this.getValue();

	}

	deserialize( data ) {

		this.setValue( data.value );

	}

}

Input.prototype.isInput = true;

class Node extends Serializer {

	constructor() {

		super();

		const dom = document.createElement( 'f-node' );

		const onDown = () => {

			const canvas = this.canvas;

			if ( canvas !== null ) {

				canvas.select( this );

			}

		};

		dom.addEventListener( 'mousedown', onDown, true );
		dom.addEventListener( 'touchstart', onDown, true );

		this._onConnect = ( e ) => {

			const { target } = e;

			for ( const element of this.elements ) {

				if ( element !== target ) {

					element.dispatchEvent( new Event( 'nodeConnect' ) );

				}

			}

		};

		this._onConnectChildren = ( e ) => {

			const { target } = e;

			for ( const element of this.elements ) {

				if ( element !== target ) {

					element.dispatchEvent( new Event( 'nodeConnectChildren' ) );

				}

			}

		};

		this.dom = dom;

		this.style = '';

		this.canvas = null;

		this.elements = [];

		this.events = {
			'focus': [],
			'blur': []
		};

		this.setWidth( 300 ).setPosition( 0, 0 );

	}

	onFocus( callback ) {

		this.events.focus.push( callback );

		return this;

	}

	onBlur( callback ) {

		this.events.blur.push( callback );

		return this;

	}

	setStyle( style ) {

		const dom = this.dom;

		if ( this.style ) dom.classList.remove( this.style );

		if ( style ) dom.classList.add( style );

		this.style = style;

		return this;

	}

	setPosition( x, y ) {

		const dom = this.dom;

		dom.style.left = toPX( x );
		dom.style.top = toPX( y );

		return this;

	}

	getPosition() {

		const dom = this.dom;

		return {
			x: parseInt( dom.style.left ),
			y: parseInt( dom.style.top )
		};

	}

	setWidth( val ) {

		this.dom.style.width = toPX( val );

		return this;

	}

	getWidth() {

		return parseInt( this.dom.style.width );

	}

	add( element ) {

		this.elements.push( element );

		element.node = this;
		element.addEventListener( 'connect', this._onConnect );
		element.addEventListener( 'connectChildren', this._onConnectChildren );

		this.dom.appendChild( element.dom );

		return this;

	}

	remove( element ) {

		this.elements.splice( this.elements.indexOf( element ), 1 );

		element.node = null;
		element.removeEventListener( 'connect', this._onConnect );
		element.removeEventListener( 'connectChildren', this._onConnectChildren );

		this.dom.removeChild( element.dom );

		return this;

	}

	dispose() {

		const canvas = this.canvas;

		if ( canvas !== null ) canvas.remove( this );

		for ( const element of this.elements ) {

			element.dispose();

		}

		this.dispatchEvent( new Event( 'dispose' ) );

	}

	isCircular( node ) {

		if ( node === this ) return true;

		const links = this.getLinks();

		for ( const link of links ) {

			if ( link.outputElement.node.isCircular( node ) ) {

				return true;

			}

		}

		return false;

	}

	getLinks() {

		const links = [];

		for ( const element of this.elements ) {

			links.push( ...element.links );

		}

		return links;

	}

	serialize( data ) {

		const { x, y, style } = this.getPosition();

		const elements = [];

		for ( const element of this.elements ) {

			elements.push( element.toJSON( data ).id );

		}

		data.x = x;
		data.y = y;
		data.width = this.getWidth();
		data.elements = elements;

		if ( style !== '' ) {

			data.style = style;

		}

	}

	deserialize( data ) {

		this.setPosition( data.x, data.y );
		this.setWidth( data.width );

		if ( data.style !== undefined ) {

			this.setStyle( data.style );

		}

		const elements = this.elements;

		if ( elements.length > 0 ) {

			let index = 0;

			for ( const id of data.elements ) {

				data.objects[ id ] = elements[ index ++ ];

			}

		} else {

			for ( const id of data.elements ) {

				this.add( data.objects[ id ] );

			}

		}

	}

}

Node.prototype.isNode = true;

class DraggableElement extends Element {

	constructor( draggable = true ) {

		super( true );

		this.draggable = draggable;

		const onDrag = ( e ) => {

			e.preventDefault();

			if ( this.draggable === true ) {

				draggableDOM( this.node.dom );

			}

		};

		const { dom } = this;

		dom.addEventListener( 'mousedown', onDrag, true );
		dom.addEventListener( 'touchstart', onDrag, true );

	}

}

class TitleElement extends DraggableElement {

	constructor( title, draggable = true ) {

		super( draggable );

		const { dom } = this;

		dom.className = 'title';

		const spanDOM = document.createElement( 'span' );
		spanDOM.innerText = title;

		const iconDOM = document.createElement( 'i' );

		const toolbarDOM = document.createElement( 'f-toolbar' );

		this.buttons = [];

		this.spanDOM = spanDOM;
		this.iconDOM = iconDOM;
		this.toolbarDOM = toolbarDOM;

		dom.appendChild( spanDOM );
		dom.appendChild( iconDOM );
		dom.appendChild( toolbarDOM );

	}

	setIcon( value ) {

		this.iconDOM.className = value;

		return this;

	}

	getIcon() {

		return this.iconDOM.className;

	}

	setTitle( value ) {

		this.spanDOM.innerText = value;

		return this;

	}

	getTitle() {

		return this.spanDOM.innerText;

	}

	addButton( button ) {

		this.buttons.push( button );

		this.toolbarDOM.appendChild( button.dom );

		return this;

	}

	serialize( data ) {

		super.serialize( data );

		const title = this.getTitle();
		const icon = this.getIcon();

		data.title = title;

		if ( icon !== '' ) {

			data.icon = icon;

		}

	}

	deserialize( data ) {

		super.deserialize( data );

		this.setTitle( data.title );

		if ( data.icon !== undefined ) {

			this.setIcon( data.icon );

		}

	}

}

const drawLine = ( p1x, p1y, p2x, p2y, invert, size, color, ctx ) => {

	const offset = 100 * ( invert ? - 1 : 1 );

	ctx.beginPath();

	ctx.moveTo( p1x, p1y );

	ctx.bezierCurveTo(
		p1x + offset, p1y,
		p2x - offset, p2y,
		p2x, p2y
	);

	ctx.lineWidth = size;
	ctx.strokeStyle = color;
	ctx.stroke();

};

const colors = [
	'#ff4444',
	'#44ff44',
	'#4444ff'
];

const dropNode = new Node().add( new TitleElement( 'File' ) ).setWidth( 250 );

class Canvas extends Serializer {

	constructor() {

		super();

		const dom = document.createElement( 'f-canvas' );
		const contentDOM = document.createElement( 'f-content' );
		const areaDOM = document.createElement( 'f-area' );
		const dropDOM = document.createElement( 'f-drop' );

		const canvas = document.createElement( 'canvas' );
		const frontCanvas = document.createElement( 'canvas' );

		const context = canvas.getContext( '2d' );
		const frontContext = frontCanvas.getContext( '2d' );

		this.dom = dom;

		this.contentDOM = contentDOM;
		this.areaDOM = areaDOM;
		this.dropDOM = dropDOM;

		this.canvas = canvas;
		this.frontCanvas = frontCanvas;

		this.context = context;
		this.frontContext = frontContext;

		this.width = 10000;
		this.height = 10000;

		this.clientX = 0;
		this.clientY = 0;

		this.relativeClientX = 0;
		this.relativeClientY = 0;

		this.zoom = 1;

		this.nodes = [];

		this.selected = null;

		this.updating = false;

		this.droppedItems = [];

		this.events = {
			'drop': []
		};

		frontCanvas.className = 'front';

		contentDOM.style.left = toPX( this.centerX );
		contentDOM.style.top = toPX( this.centerY );

		areaDOM.style.width = `calc( 100% + ${ this.width }px )`;
		areaDOM.style.height = `calc( 100% + ${ this.height }px )`;

		dropDOM.innerHTML = '<span>drop your file</span>';

		dom.appendChild( dropDOM );
		dom.appendChild( canvas );
		dom.appendChild( frontCanvas );
		dom.appendChild( contentDOM );
		dom.appendChild( areaDOM );
		/*
		let zoomTouchData = null;

		const onZoomStart = () => {

			zoomTouchData = null;

		};
*/
		const onZoom = ( e ) => {

			if ( e.touches ) {

				if ( e.touches.length === 2 ) {

					e.preventDefault();

					e.stopImmediatePropagation();
					/*
					const clientX = ( e.touches[ 0 ].clientX + e.touches[ 1 ].clientX ) / 2;
					const clientY = ( e.touches[ 0 ].clientY + e.touches[ 1 ].clientY ) / 2;

					const distance = Math.hypot(
						e.touches[ 0 ].clientX - e.touches[ 1 ].clientX,
						e.touches[ 0 ].clientY - e.touches[ 1 ].clientY
					);

					if ( zoomTouchData === null ) {

						zoomTouchData = {
							distance
						};

					}

					const delta = ( zoomTouchData.distance - distance );
					zoomTouchData.distance = distance;

					let zoom = Math.min( Math.max( this.zoom - delta * .01, .5 ), 1.2 );

					if ( zoom < .52 ) zoom = .5;
					else if ( zoom > .98 ) zoom = 1;

					contentDOM.style.left = toPX( this.centerX / zoom );
					contentDOM.style.top = toPX( this.centerY / zoom );
					contentDOM.style.zoom = this.zoom = zoom;
*/

				}

			} else {

				e.preventDefault();

				e.stopImmediatePropagation();
				/*
				const delta = e.deltaY / 100;
				const zoom = Math.min( Math.max( this.zoom - delta * .1, .5 ), 1 );

				contentDOM.style.left = toPX( this.centerX / zoom );
				contentDOM.style.top = toPX( this.centerY / zoom );
				contentDOM.style.zoom = this.zoom = zoom;
*/

			}

		};

		dom.addEventListener( 'wheel', onZoom );
		dom.addEventListener( 'touchmove', onZoom );
		//dom.addEventListener( 'touchstart', onZoomStart );

		let dropEnterCount = 0;

		const dragState = ( enter ) => {

			if ( enter ) {

				if ( dropEnterCount ++ === 0 ) {

					this.droppedItems = [];

					dropDOM.classList.add( 'visible' );

					this.add( dropNode );

				}

			} else if ( -- dropEnterCount === 0 ) {

				dropDOM.classList.remove( 'visible' );

				this.remove( dropNode );

			}

		};

		dom.addEventListener( 'dragenter', () => {

 			dragState( true );

		} );

		dom.addEventListener( 'dragleave', () => {

			dragState( false );

		} );

		dom.addEventListener( 'dragover', ( e ) => {

			e.preventDefault();

			const { relativeClientX, relativeClientY } = this;

			const centerNodeX = dropNode.getWidth() / 2;

			dropNode.setPosition( relativeClientX - centerNodeX, relativeClientY - 20 );

		} );

		dom.addEventListener( 'drop', ( e ) => {

			e.preventDefault();

			dragState( false );

			this.droppedItems = e.dataTransfer.items;

			dispatchEventList( this.events.drop, this );

		} );

		draggableDOM( dom, ( data ) => {

			const { delta, isTouch } = data;

			if ( ! isTouch ) {

				if ( data.scrollTop === undefined ) {

					data.scrollLeft = dom.scrollLeft;
					data.scrollTop = dom.scrollTop;

				}

				dom.scrollLeft = data.scrollLeft - delta.x;
				dom.scrollTop = data.scrollTop - delta.y;

			}

			if ( data.dragging ) {

				dom.classList.add( 'grabbing' );

			} else {

				dom.classList.remove( 'grabbing' );

			}

		}, 'dragging-canvas' );

		this._onMoveEvent = ( e ) => {

			const event = e.touches ? e.touches[ 0 ] : e;
			const { zoom, rect } = this;

			this.clientX = event.clientX;
			this.clientY = event.clientY;

			this.relativeClientX = ( ( ( dom.scrollLeft - this.centerX ) + event.clientX ) - rect.left ) / zoom;
			this.relativeClientY = ( ( ( dom.scrollTop - this.centerY ) + event.clientY ) - rect.top ) / zoom;

		};

		this._onContentLoaded = () => {

			this.centralize();

		};

		this._onUpdate = () => {

			this.update();

		};

		this.start();

	}

	get rect() {

		return this.dom.getBoundingClientRect();

	}

	get relativeX() {

		return this.dom.scrollLeft - this.centerX;

	}

	get relativeY() {

		return this.dom.scrollTop - this.centerY;

	}

	get centerX() {

		return this.width / 2;

	}

	get centerY() {

		return this.height / 2;

	}

	onDrop( callback ) {

		this.events.drop.push( callback );

		return this;

	}

	start() {

		this.updating = true;

		document.addEventListener( 'wheel', this._onMoveEvent, true );

		document.addEventListener( 'mousedown', this._onMoveEvent, true );
		document.addEventListener( 'touchstart', this._onMoveEvent, true );

		document.addEventListener( 'mousemove', this._onMoveEvent, true );
		document.addEventListener( 'touchmove', this._onMoveEvent, true );

		document.addEventListener( 'dragover', this._onMoveEvent, true );

		document.addEventListener( 'DOMContentLoaded', this._onContentLoaded );

		requestAnimationFrame( this._onUpdate );

	}

	stop() {

		this.updating = false;

		document.removeEventListener( 'wheel', this._onMoveEvent, true );

		document.removeEventListener( 'mousedown', this._onMoveEvent, true );
		document.removeEventListener( 'touchstart', this._onMoveEvent, true );

		document.removeEventListener( 'mousemove', this._onMoveEvent, true );
		document.removeEventListener( 'touchmove', this._onMoveEvent, true );

		document.removeEventListener( 'dragover', this._onMoveEvent, true );

		document.removeEventListener( 'DOMContentLoaded', this._onContentLoaded );

	}

	add( node ) {

		this.nodes.push( node );

		node.canvas = this;

		this.contentDOM.appendChild( node.dom );

		return this;

	}

	remove( node ) {

		if ( node === this.selected ) {

			this.select();

		}

		this.unlink( node );

		const nodes = this.nodes;

		nodes.splice( nodes.indexOf( node ), 1 );

		node.canvas = null;

		this.contentDOM.removeChild( node.dom );

		return this;

	}

	clear() {

		const nodes = this.nodes;

		while ( nodes.length > 0 ) {

			this.remove( nodes[ 0 ] );

		}

		return this;

	}

	unlink( node ) {

		const links = this.getLinks();

		for ( const link of links ) {

			if ( link.outputElement && link.outputElement.node === node ) {

				link.inputElement.connect();

			}

		}

	}

	getLinks() {

		const links = [];

		for ( const node of this.nodes ) {

			links.push( ...node.getLinks() );

		}

		return links;

	}

	centralize() {

		this.dom.scroll( this.centerX, this.centerY );

		return this;

	}

	select( node = null ) {

		if ( node === this.selected ) return;

		const previousNode = this.selected;

		if ( previousNode !== null ) {

			previousNode.dom.classList.remove( 'selected' );

			this.selected = null;

			dispatchEventList( previousNode.events.blur, previousNode );

		}

		if ( node !== null ) {

			node.dom.classList.add( 'selected' );

			this.selected = node;

			dispatchEventList( node.events.focus, node );

		}

	}

	update() {

		if ( this.updating === false ) return;

		requestAnimationFrame( this._onUpdate );

		const { dom, zoom, canvas, frontCanvas, frontContext, context } = this;

		const width = window.innerWidth;
		const height = window.innerHeight;

		const domRect = this.rect;

		if ( canvas.width !== width || canvas.height !== height ) {

			canvas.width = width;
			canvas.height = height;

			frontCanvas.width = width;
			frontCanvas.height = height;

		}

		context.clearRect( 0, 0, width, height );
		frontContext.clearRect( 0, 0, width, height );

		context.globalCompositeOperation = 'lighter';
		frontContext.globalCompositeOperation = 'source-over';

		const links = this.getLinks();

		const aPos = { x: 0, y: 0 };
		const bPos = { x: 0, y: 0 };

		const offsetIORadius = 10;

		let dragging = '';

		for ( const link of links ) {

			const { lioElement, rioElement } = link;

			let draggingLink = '';
			let length = 0;

			if ( lioElement !== null ) {

				const rect = lioElement.dom.getBoundingClientRect();

				length = Math.max( length, lioElement.rioLength );

				aPos.x = rect.x + rect.width;
				aPos.y = rect.y + ( rect.height / 2 );

			} else {

				aPos.x = this.clientX;
				aPos.y = this.clientY;

				draggingLink = 'lio';

			}

			if ( rioElement !== null ) {

				const rect = rioElement.dom.getBoundingClientRect();

				length = Math.max( length, rioElement.lioLength );

				bPos.x = rect.x;
				bPos.y = rect.y + ( rect.height / 2 );

			} else {

				bPos.x = this.clientX;
				bPos.y = this.clientY;

				draggingLink = 'rio';

			}

			dragging = dragging || draggingLink;

			const drawContext = draggingLink ? frontContext : context;

			if ( draggingLink || length === 1 ) {

				if ( draggingLink === 'rio' ) {

					aPos.x += offsetIORadius;
					bPos.x /= zoom;
					bPos.y /= zoom;

				} else if ( draggingLink === 'lio' ) {

					bPos.x -= offsetIORadius;
					aPos.x /= zoom;
					aPos.y /= zoom;

				}

				drawLine(
					aPos.x * zoom, aPos.y * zoom,
					bPos.x * zoom, bPos.y * zoom,
					false, 2, '#ffffff', drawContext
				);

			} else {

				length = Math.min( length, 4 );

				for ( let i = 0; i < length; i ++ ) {

					const color = colors[ i ] || '#ffffff';

					const marginY = 4;

					const rioLength = Math.min( lioElement.rioLength, length );
					const lioLength = Math.min( rioElement.lioLength, length );

					const aCenterY = ( ( rioLength * marginY ) * .5 ) - ( marginY / 2 );
					const bCenterY = ( ( lioLength * marginY ) * .5 ) - ( marginY / 2 );

					const aIndex = Math.min( i, rioLength - 1 );
					const bIndex = Math.min( i, lioLength - 1 );

					const aPosY = aIndex * marginY;
					const bPosY = bIndex * marginY;

					drawLine(
						aPos.x * zoom, ( ( aPos.y + aPosY ) - aCenterY ) * zoom,
						bPos.x * zoom, ( ( bPos.y + bPosY ) - bCenterY ) * zoom,
						false, 2, color, drawContext
					);

				}

			}

		}

		context.globalCompositeOperation = 'destination-in';

		context.fillRect( domRect.x, domRect.y, domRect.width, domRect.height );

		if ( dragging !== '' ) {

			dom.classList.add( 'dragging-' + dragging );

		} else {

			dom.classList.remove( 'dragging-lio' );
			dom.classList.remove( 'dragging-rio' );

		}

	}

	serialize( data ) {

		const nodes = [];

		for ( const node of this.nodes ) {

			nodes.push( node.toJSON( data ).id );

		}

		data.nodes = nodes;

	}

	deserialize( data ) {

		for ( const id of data.nodes ) {

			this.add( data.objects[ id ] );

		}

	}

}

class ButtonInput extends Input {

	constructor( innterText = '' ) {

		const dom = document.createElement( 'button' );

		const spanDOM = document.createElement( 'span' );
		dom.appendChild( spanDOM );

		const iconDOM = document.createElement( 'i' );
		dom.appendChild( iconDOM );

		super( dom );

		this.spanDOM = spanDOM;
		this.iconDOM = iconDOM;

		spanDOM.innerText = innterText;

		dom.onmouseover = () => {

			this.dispatchEvent( new Event( 'mouseover' ) );

		};

		dom.onclick = dom.ontouchstart = ( e ) => {

			e.preventDefault();

			e.stopPropagation();

			this.dispatchEvent( new Event( 'click' ) );

		};

	}

	setIcon( className ) {

		this.iconDOM.className = className;

		return this;

	}

	setValue( val ) {

		this.spanDOM.innerText = val;

		return this;

	}

	getValue() {

		return this.spanDOM.innerText;

	}

}

class ObjectNode extends Node {

	constructor( name, inputLength, extra = null, width = 300 ) {

		super();

		this.setWidth( width );

		const title = new TitleElement( name )
			.setExtra( extra )
			.setOutput( inputLength );

		const closeButton = new ButtonInput( Styles.icons.close || '✕' ).onClick( () => {

			this.dispose();

		} ).setIcon( Styles.icons.close );

		title.addButton( closeButton );

		this.add( title );

		this.title = title;
		this.closeButton = closeButton;

	}

	setExtra( value ) {

		this.title.setExtra( value );

		return this;

	}

	getExtra( value ) {

		return this.title.getExtra();

	}

	invalidate() {

		this.title.dispatchEvent( new Event( 'connect' ) );

	}

}

const ENTER_KEY$1 = 13;

class StringInput extends Input {

	constructor( value = '' ) {

		const dom = document.createElement( 'input' );
		super( dom );

		dom.type = 'text';
		dom.value = value;
		dom.spellcheck = false;
		dom.autocomplete = 'off';

		dom.onblur = () => {

			this.dispatchEvent( new Event( 'blur' ) );

		};

		dom.onchange = () => {

			this.dispatchEvent( new Event( 'change' ) );

		};

		dom.onkeyup = ( e ) => {

			if ( e.keyCode === ENTER_KEY$1 ) {

				e.target.blur();

			}

			e.stopPropagation();

			this.dispatchEvent( new Event( 'change' ) );

		};

	}

}

const ENTER_KEY = 13;

class NumberInput extends Input {

	constructor( value = 0, min = - Infinity, max = Infinity, step = .01 ) {

		const dom = document.createElement( 'input' );
		super( dom );

		this.min = min;
		this.max = max;
		this.step = step;

		this.integer = false;

		dom.type = 'text';
		dom.className = 'number';
		dom.value = this._getString( value );
		dom.spellcheck = false;
		dom.autocomplete = 'off';

		dom.ondragstart = dom.oncontextmenu = ( e ) => {

			e.preventDefault();

			e.stopPropagation();

		};

		dom.onfocus = dom.onclick = () => {

			dom.select();

		};

		dom.onblur = () => {

			this.dispatchEvent( new Event( 'blur' ) );

		};

		dom.onchange = () => {

			this.dispatchEvent( new Event( 'change' ) );

		};

		dom.onkeydown = ( e ) => {

			if ( e.key.length === 1 && /\d|\./.test( e.key ) !== true ) {

				return false;

			}

			if ( e.keyCode === ENTER_KEY ) {

				e.target.blur();

			}

			e.stopPropagation();

		};

		draggableDOM( dom, ( data ) => {

			const { delta } = data;

			if ( data.value === undefined ) {

				data.value = this.getValue();

			}

			const diff = delta.x - delta.y;

			const value = data.value + ( diff * this.step );

			this.dom.value = this._getString( value.toFixed( this.precision ) );

			this.dispatchEvent( new Event( 'change' ) );

		} );

	}

	setRange( min, max, step ) {

		this.min = min;
		this.max = max;
		this.step = step;

		this.dispatchEvent( new Event( 'range' ) );

		return this.setValue( this.getValue() );

	}

	get precision() {

		if ( this.integer === true ) return 0;

		const fract = this.step % 1;

		return fract !== 0 ? fract.toString().split( '.' )[ 1 ].length : 1;

	}

	setValue( val, dispatch = true ) {

		return super.setValue( this._getString( val ), dispatch );

	}

	getValue() {

		return Number( this.dom.value );

	}

	serialize( data ) {

		const { min, max } = this;

		if ( min !== - Infinity && max !== Infinity ) {

			data.min = this.min;
			data.max = this.max;
			data.step = this.step;

		}

		super.serialize( data );

	}

	deserialize( data ) {

		if ( data.min !== undefined ) {

			const { min, max, step } = this;

			this.setRange( min, max, step );

		}

		super.deserialize( data );

	}

	_getString( value ) {

		let num = Math.min( Math.max( Number( value ), this.min ), this.max );

		if ( this.integer === true ) {

			return Math.floor( num );

		} else {

			return num + ( num % 1 ? '' : '.0' );

		}

	}

}

const getStep = ( min, max ) => {

	const sensibility = .001;

	return ( max - min ) * sensibility;

};

class SliderInput extends Input {

	constructor( value = 0, min = 0, max = 100 ) {

		const dom = document.createElement( 'f-subinputs' );
		super( dom );

		value = Math.min( Math.max( value, min ), max );

		const step = getStep( min, max );

		const rangeDOM = document.createElement( 'input' );
		rangeDOM.type = 'range';
		rangeDOM.min = min;
		rangeDOM.max = max;
		rangeDOM.step = step;
		rangeDOM.value = value;

		const field = new NumberInput( value, min, max, step );
		field.dom.className = 'range-value';
		field.onChange( () => {

			rangeDOM.value = field.getValue();

		} );

		field.addEventListener( 'range', () => {

			rangeDOM.min = field.min;
			rangeDOM.max = field.max;
			rangeDOM.step = field.step;
			rangeDOM.value = field.getValue();

		} );

		dom.appendChild( rangeDOM );
		dom.appendChild( field.dom );

		this.rangeDOM = rangeDOM;
		this.field = field;

		const updateRangeValue = () => {

			let value = Number( rangeDOM.value );

			if ( value !== this.max && value + this.step >= this.max ) {

				// fix not end range fraction

				rangeDOM.value = value = this.max;

			}

			this.field.setValue( value );

		};

		draggableDOM( rangeDOM, () => {

			updateRangeValue();

			this.dispatchEvent( new Event( 'change' ) );

		}, '' );

	}

	get min() {

		return this.field.min;

	}

	get max() {

		return this.field.max;

	}

	get step() {

		return this.field.step;

	}

	setRange( min, max ) {

		this.field.setRange( min, max, getStep( min, max ) );

		this.dispatchEvent( new Event( 'range' ) );
		this.dispatchEvent( new Event( 'change' ) );

		return this;

	}

	setValue( val, dispatch = true ) {

		this.field.setValue( val );
		this.rangeDOM.value = val;

		if ( dispatch ) this.dispatchEvent( new Event( 'change' ) );

		return this;

	}

	getValue() {

		return this.field.getValue();

	}

	serialize( data ) {

		data.min = this.min;
		data.max = this.max;

		super.serialize( data );

	}

	deserialize( data ) {

		const { min, max } = data;

		this.setRange( min, max );

		super.deserialize( data );

	}

}

class ColorInput extends Input {

	constructor( value = 0x0099ff ) {

		const dom = document.createElement( 'input' );
		super( dom );

		dom.type = 'color';
		dom.value = toHex( value );

		dom.oninput = () => {

			this.dispatchEvent( new Event( 'change' ) );

		};

	}

	setValue( value, dispatch = true ) {

		return super.setValue( toHex( value ), dispatch );

	}

	getValue() {

		return parseInt( super.getValue().substr( 1 ), 16 );

	}

}

class TextInput extends Input {

	constructor( innerText = '' ) {

		const dom = document.createElement( 'textarea' );
		super( dom );

		dom.innerText = innerText;

	}

	setValue( val ) {

		this.dom.innerText = val;

		return this;

	}

	getValue() {

		return this.dom.innerText;

	}

}

class LabelElement extends Element {

	constructor( label = '', align = '' ) {

		super();

		this.labelDOM = document.createElement( 'f-label' );
		this.inputsDOM = document.createElement( 'f-inputs' );

		const spanDOM = document.createElement( 'span' );
		const iconDOM = document.createElement( 'i' );

		this.spanDOM = spanDOM;
		this.iconDOM = iconDOM;

		this.labelDOM.appendChild( this.spanDOM );
		this.labelDOM.appendChild( this.iconDOM );

		this.dom.appendChild( this.labelDOM );
		this.dom.appendChild( this.inputsDOM );

		this.setLabel( label );
		this.setAlign( align );

	}

	setIcon( value ) {

		this.iconDOM.className = value;

		return this;

	}

	getIcon() {

		return this.iconDOM.className;

	}

	setAlign( align ) {

		this.labelDOM.className = align;

	}

	setLabel( val ) {

		this.spanDOM.innerText = val;

	}

	getLabel() {

		return this.spanDOM.innerText;

	}

	serialize( data ) {

		super.serialize( data );

		const label = this.getLabel();
		const icon = this.getIcon();

		data.label = label;

		if ( icon !== '' ) {

			data.icon = icon;

		}

	}

	deserialize( data ) {

		super.deserialize( data );

		this.setLabel( data.label );

		if ( data.icon !== undefined ) {

			this.setIcon( data.icon );

		}

	}

}

class PanelNode extends Node {

	constructor( title = 'Panel', align = 'top-right' ) {

		super();

		const titleElement = new TitleElement( title );
		this.add( titleElement );

		const collapseButton = new ButtonInput( '🗕' );
		collapseButton.onClick( () => {

			this.setCollapse( ! this.collapsed );

		} );

		titleElement.addButton( collapseButton );

		this.collapseButton = collapseButton;
		this.titleElement = titleElement;
		this.align = align;
		this.collapsed = false;

		this.setAlign( align );
		this.setStyle( 'rouded' );

	}

	setCollapse( value ) {

		const cssClass = 'closed';

		this.dom.classList.remove( cssClass );

		this.collapsed = value;

		this.collapseButton.value = value ? '🗖' : '🗕';

		if ( value === true ) {

			this.dom.classList.add( cssClass );

		}

		return this;

	}

	setAlign( align ) {

		if ( this.align ) this.dom.classList.remove( this.align );
		this.dom.classList.add( align );

		this.align = align;

		return this;

	}

	addInput( inputClass, object, property, ...params ) {

		const value = object[ property ];

		const input = new inputClass( value, ...params );
		input.onChange( () => {

			object[ property ] = input.value;

		} );

		this.add( new LabelElement( property ).add( input ) );

		return input;

	}

	addSlider( object, property, min, max ) {

		return this.addInput( SliderInput, object, property, min, max );

	}

	addNumber( object, property ) {

		return this.addInput( NumberInput, object, property );

	}

	addColor( object, property ) {

		return this.addInput( ColorInput, object, property );

	}

	addString( object, property ) {

		return this.addInput( StringInput, object, property );

	}

	addText( object, property ) {

		const input = this.addInput( TextInput, object, property );
		input.element.setHeight( 70 );

		return input;

	}

	addButton( name ) {

		const input = new ButtonInput( name );

		this.add( new Element().setHeight( 34 ).add( input ) );

		return input;

	}

}

class Menu extends EventTarget {

	constructor( className, target = null ) {

		super();

		const dom = document.createElement( 'f-menu' );
		dom.className = className + ' hidden';

		this.dom = dom;

		this.visible = false;

		this.subMenus = new WeakMap();
		this.domButtons = new WeakMap();

		this.events = {
			'context': []
		};

		this.addEventListener( 'context', ( ) => {

			dispatchEventList( this.events.context, this );

		} );

		this._lastButtonClick = null;

		this._onButtonClick = ( e = null ) => {

			const button = e ? e.target : null;

			if ( this._lastButtonClick ) {

				this._lastButtonClick.dom.parentElement.classList.remove( 'active' );

			}

			this._lastButtonClick = button;

			if ( button ) {

				if ( this.subMenus.has( button ) ) {

					this.subMenus.get( button )._onButtonClick();

				}

				button.dom.parentElement.classList.add( 'active' );

			}

		};

		this._onButtonMouseOver = ( e ) => {

			const button = e.target;

			if ( this.subMenus.has( button ) && this._lastButtonClick !== button ) {

				this._onButtonClick();

			}

		};

		this.setTarget( target );

	}

	onContext( callback ) {

		this.events.context.push( callback );

		return this;

	}

	show( x = null, y = null ) {

		this._onButtonClick();

		if ( x !== null && y !== null ) {

			this.setPosition( x, y );

		}

		this.dom.classList.remove( 'hidden' );

		this.visible = true;

		this.dispatchEvent( new Event( 'show' ) );

		return this;

	}

	hide() {

		this.dom.classList.add( 'hidden' );

		this.dispatchEvent( new Event( 'hide' ) );

		this.visible = false;

	}

	setTarget( target = null ) {

		if ( target !== null ) {

			const onContextMenu = ( e ) => {

				e.preventDefault();

				if ( e.pointerType !== 'mouse' || ( e.pageX === 0 && e.pageY === 0 ) ) return;

				const rect = this.target.getBoundingClientRect();

				this.dispatchEvent( new Event( 'context' ) );

				this.show( e.pageX - rect.left, e.pageY - rect.top );

			};

			const onDown = ( e ) => {

				if ( this.visible === true && e.target.closest( 'f-menu' ) === null ) {

					this.hide();

				}

			};

			this.target = target;

			target.addEventListener( 'mousedown', onDown, true );
			target.addEventListener( 'touchstart', onDown, true );

			target.addEventListener( 'contextmenu', onContextMenu, false );

			target.appendChild( this.dom );

		}

		return this;

	}

	add( button, submenu = null ) {

		const liDOM = document.createElement( 'f-item' );

		if ( submenu !== null ) {

			liDOM.classList.add( 'submenu' );

			liDOM.appendChild( submenu.dom );

			this.subMenus.set( button, submenu );

		}

		liDOM.appendChild( button.dom );

		button.addEventListener( 'click', this._onButtonClick );
		button.addEventListener( 'mouseover', this._onButtonMouseOver );

		this.dom.appendChild( liDOM );

		this.domButtons.set( liDOM, button );

		return this;

	}

	setPosition( x, y ) {

		const dom = this.dom;

		dom.style.left = toPX( x );
		dom.style.top = toPX( y );

		return this;

	}

}

let lastContext = null;

class ContextMenu extends Menu {

	constructor( target = null ) {

		super( 'context', target );

	}

	show( x, y ) {

		if ( lastContext !== null ) {

			lastContext.hide();

		}

		lastContext = this;

		return super.show( x, y );

	}

	hide() {

		if ( lastContext === this ) {

			lastContext = null;

		}

		return super.hide();

	}

}

class CircleMenu extends Menu {

	constructor( target = null ) {

		super( 'circle', target );

	}
	
}

class SelectInput extends Input {

	constructor( options = [] ) {

		const dom = document.createElement( 'select' );
		super( dom );

		dom.onchange = () => {

			this.dispatchEvent( new Event( 'change' ) );

		};

		this.setOptions( options );

	}

	setOptions( options ) {

		const dom = this.dom;

		this.options = options;

		dom.innerHTML = '';

		for ( let index = 0; index < options.length; index ++ ) {

			let opt = options[ index ];

			if ( typeof opt === 'string' ) {

				opt = { name: opt, value: index };

			}

			const option = document.createElement( 'option' );
			option.innerText = opt.name;
			option.value = opt.value;

			dom.appendChild( option );

		}

		return this;

	}

	getOptions() {

		return this._options;

	}

	serialize( data ) {

		data.options = [ ...this.options ];

		super.serialize( data );

	}

	deserialize( data ) {

		const currentOptions = this.options;

		if ( currentOptions.length > 0 ) {

			this.setOptions( data.options );

		}

		super.deserialize( data );

	}

}

class ToggleInput extends Input {

	constructor( value = false ) {

		const dom = document.createElement( 'input' );
		super( dom );

		dom.type = 'checkbox';
		dom.className = 'toggle';
		dom.checked = value;

	}

	setValue( val ) {

		this.dom.checked = val;

		this.dispatchEvent( new Event( 'change' ) );

		return this;

	}

	getValue() {

		return this.dom.checked;

	}

}

var Flow = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Element: Element,
	Input: Input,
	Node: Node,
	Canvas: Canvas,
	Serializer: Serializer,
	Styles: Styles,
	ObjectNode: ObjectNode,
	PanelNode: PanelNode,
	Menu: Menu,
	ContextMenu: ContextMenu,
	CircleMenu: CircleMenu,
	DraggableElement: DraggableElement,
	LabelElement: LabelElement,
	TitleElement: TitleElement,
	ButtonInput: ButtonInput,
	ColorInput: ColorInput,
	NumberInput: NumberInput,
	SelectInput: SelectInput,
	SliderInput: SliderInput,
	StringInput: StringInput,
	TextInput: TextInput,
	ToggleInput: ToggleInput
});

class Loader extends EventTarget {

	constructor( parseType = Loader.DEFAULT ) {

		super();

		this.parseType = parseType;

		this.events = {
			'load': []
		};

	}

	setParseType( type ) {

		this.parseType = type;

		return this;

	}

	getParseType() {

		return this.parseType;

	}

	onLoad( callback ) {

		this.events.load.push( callback );

		return this;

	}

	async load( url, lib = null ) {

		return await fetch( url )
			.then( response => response.json() )
			.then( result => {

				this.data = this.parse( result, lib );

				dispatchEventList( this.events.load, this );

				return this.data;

			} )
			.catch( err => {

				console.error( 'Loader:', err );

			} );

	}

	parse( json, lib = null ) {

		json = this._parseObjects( json, lib );

		const parseType = this.parseType;

		if ( parseType === Loader.DEFAULT ) {

			const flowObj = new Flow[ json.type ]();

			if ( flowObj.getSerializable() ) {

				flowObj.deserialize( json );

			}

			return flowObj;

		} else if ( parseType === Loader.OBJECTS ) {

			return json;

		}

	}

	_parseObjects( json, lib = null ) {

		json = { ...json };

		const objects = {};

		for ( const id in json.objects ) {

			const obj = json.objects[ id ];
			obj.objects = objects;

			const Class = lib && lib[ obj.type ] ? lib[ obj.type ] : Flow[ obj.type ];

			objects[ id ] = new Class();

		}

		const ref = new WeakMap();

		const deserializePass = ( prop = null ) => {

			for ( const id in json.objects ) {

				const newObject = objects[ id ];

				if ( ref.has( newObject ) === false && ( prop === null || newObject[ prop ] === true ) ) {

					ref.set( newObject, true );

					if ( newObject.getSerializable() ) {

						newObject.deserialize( json.objects[ id ] );

					}

				}

			}

		};

		deserializePass( 'isNode' );
		deserializePass( 'isElement' );
		deserializePass( 'isInput' );
		deserializePass();

		json.objects = objects;

		return json;

	}

}

Loader.DEFAULT = 'default';
Loader.OBJECTS = 'objects';

export { ButtonInput, Canvas, CircleMenu, ColorInput, ContextMenu, DraggableElement, Element, Input, LabelElement, Loader, Menu, Node, NumberInput, ObjectNode, PanelNode, REVISION, SelectInput, Serializer, SliderInput, StringInput, Styles, TextInput, TitleElement, ToggleInput, Utils };
