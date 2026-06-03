import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    describe,
    test,
    expect,
    vi,
} from 'vitest';
import Header from '../components/Header';

vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        user: { username: 'Yuliia', role: 'admin' },
        logout: vi.fn(),
    }),
}));

describe('Header Component', () => {
    test('renders navigation links', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Головна/i)).toBeInTheDocument();
        expect(screen.getByText(/Рейси/i)).toBeInTheDocument();
        expect(screen.getByText(/Аналітика/i)).toBeInTheDocument();
        expect(screen.getByText(/Персонал/i)).toBeInTheDocument();
        expect(screen.getByText(/Вихід/i)).toBeInTheDocument();
    });
});
