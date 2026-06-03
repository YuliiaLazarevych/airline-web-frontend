import React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import {
    describe,
    test,
    expect,
    vi,
} from 'vitest';
import InputField from '../components/InputField';

describe('InputField Component', () => {
    test('renders input with correct label and value', () => {
        const handleChange = vi.fn();
        render(
            <InputField
                id="test-input"
                label="Test Label"
                value="Initial Value"
                onChange={handleChange}
                placeholder="Enter text"
            />,
        );

        expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
        const input = screen.getByPlaceholderText(/Enter text/i);
        expect(input.value).toBe('Initial Value');
    });

    test('calls onChange handler when value changes', () => {
        const handleChange = vi.fn();
        render(
            <InputField
                id="test-input"
                label="Test Label"
                value=""
                onChange={handleChange}
                placeholder="Enter text"
            />,
        );

        const input = screen.getByPlaceholderText(/Enter text/i);
        fireEvent.change(input, { target: { value: 'New Value' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
