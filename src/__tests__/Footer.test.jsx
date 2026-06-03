import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer Component', () => {
    test('renders copyright text correctly', () => {
        render(<Footer />);
        const footerText = screen.getByText(/Bayraktar Air System/i);
        expect(footerText).toBeInTheDocument();
    });
});
