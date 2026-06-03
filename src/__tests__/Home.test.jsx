import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Home from '../pages/Home';

describe('Home Page', () => {
    test('renders main hero title and description', () => {
        render(<Home />);
        expect(screen.getByText('Bayraktar Air')).toBeInTheDocument();
        expect(screen.getByText(/Ваш надійний крилатий партнер/i)).toBeInTheDocument();
    });

    test('renders features list', () => {
        render(<Home />);
        expect(screen.getByText('Сучасний флот')).toBeInTheDocument();
        expect(screen.getByText('Безпека понад усе')).toBeInTheDocument();
        expect(screen.getByText('Глобальна мережа')).toBeInTheDocument();
    });
});
