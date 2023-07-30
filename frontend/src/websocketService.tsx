console.log('store.tsx');
const serverUrl = 'wss://socketsbay.com/wss/v2/1/demo/';
let socket: WebSocket;

export const initWebSocket = () => {
	console.log('initWebSocket');
	socket = new WebSocket(serverUrl);
	socket.addEventListener('open', onConnectionOpen);
	socket.addEventListener('message', onMessageReceived);
	socket.addEventListener('close', onConnectionClose);
	socket.addEventListener('error', onConnectionError);
};

// Connection opened
const onConnectionOpen = (event: Event) => {
	console.log('onConnectionOpen');
	console.log(event);
};

// Listen for messages
const onMessageReceived = (event: MessageEvent) => {
	console.log('onMessageReceived');
	console.log(event);
};

// Connection closed
const onConnectionClose = (event: CloseEvent) => {
	console.log('onConnectionClose');
	console.log(event);
};

// Connection error
const onConnectionError = (event: Event) => {
	console.log('onConnectionError');
	console.log(event);
};
