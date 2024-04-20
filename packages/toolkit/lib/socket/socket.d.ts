import { type SocketOptions } from 'socket.io-client';
export type TOptions = SocketOptions & {
    errorFn?: Function;
    connectedFn?: Function;
    disconnectFn?: Function;
    serverUrl: string;
};
export default class SocketClient {
    socket: any;
    private connected;
    constructor(options: TOptions);
    connect(): void;
    reconnectWithBackoff(maxDelay?: number, initialDelay?: number, delayFactor?: number): void;
    on(): void;
    emit(): void;
}
