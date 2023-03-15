import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

test('renders without errors with no props', () => {
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
    render(<Display />)
    const button = screen.getByRole('button');
    fireEvent.click(button)

    const text = await waitFor(() => screen.getByText("Stranger Things"))
    expect(text).toBeTruthy();
});

test('renders show season options matching your data when the button is clicked', async () => {
    render(<Display />)
    const button = screen.getByRole('button');
    fireEvent.click(button)

    const seasonOptions = await waitFor(() => screen.getAllByTestId('season-option'))
    expect(seasonOptions).toHaveLength(5);
});
