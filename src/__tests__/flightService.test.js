import {
    describe,
    test,
    expect,
    vi,
    beforeEach,
} from 'vitest';
import {
    getFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight,
} from '../services/flightService';

describe('flightService Fetch Operations', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    test('getFlights returns data on successful fetch', async () => {
        const mockFlights = [{ id: 1, number: 'BA-100' }];
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockFlights,
        });

        const data = await getFlights();
        expect(data).toEqual(mockFlights);
        expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/flights');
    });

    test('getFlights throws error on failed fetch', async () => {
        window.fetch.mockResolvedValueOnce({ ok: false });
        await expect(getFlights()).rejects.toThrow('Не вдалося завантажити розклад рейсів.');
    });

    test('getFlightById returns single flight data', async () => {
        const mockFlight = { id: 1, number: 'BA-100' };
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockFlight,
        });

        const data = await getFlightById(1);
        expect(data).toEqual(mockFlight);
        expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/flights/1');
    });

    test('getFlightById throws error on failed fetch', async () => {
        window.fetch.mockResolvedValueOnce({ ok: false });
        await expect(getFlightById(1)).rejects.toThrow('Не вдалося завантажити рейс.');
    });
});

describe('flightService CUD Operations', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    test('createFlight successfully creates a flight', async () => {
        const newFlight = { number: 'BA-200', dest: 'Lviv - Kyiv' };
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 2, ...newFlight }),
        });

        const data = await createFlight(newFlight);
        expect(data).toEqual({ id: 2, ...newFlight });
        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/flights',
            expect.objectContaining({ method: 'POST' }),
        );
    });

    test('createFlight throws error on failure', async () => {
        window.fetch.mockResolvedValueOnce({ ok: false });
        await expect(createFlight({})).rejects.toThrow('Не вдалося створити рейс.');
    });

    test('updateFlight successfully updates a flight', async () => {
        const updatedData = { number: 'BA-200-U' };
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 2, ...updatedData }),
        });

        const data = await updateFlight(2, updatedData);
        expect(data).toEqual({ id: 2, ...updatedData });
        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/flights/2',
            expect.objectContaining({ method: 'PATCH' }),
        );
    });

    test('updateFlight throws error on failure', async () => {
        window.fetch.mockResolvedValueOnce({ ok: false });
        await expect(updateFlight(2, {})).rejects.toThrow('Не вдалося оновити рейс.');
    });

    test('deleteFlight successfully deletes a flight', async () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        const data = await deleteFlight(2);
        expect(data).toEqual({});
        expect(window.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/flights/2',
            expect.objectContaining({ method: 'DELETE' }),
        );
    });

    test('deleteFlight throws error on failure', async () => {
        window.fetch.mockResolvedValueOnce({ ok: false });
        await expect(deleteFlight(2)).rejects.toThrow('Не вдалося видалити рейс.');
    });
});
