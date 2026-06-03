import {
    describe,
    test,
    expect,
    vi,
} from 'vitest';

describe('WebSocket Connection', () => {
    test('should attempt to connect to the server', () => {
        const mockWS = vi.fn();
        vi.stubGlobal('WebSocket', mockWS);

        const socket = new WebSocket('ws://localhost:8080');
        expect(mockWS).toHaveBeenCalledWith('ws://localhost:8080');
        expect(socket).toBeDefined();
    });
});
