import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'

const myShow = {
    name: "You",
    image: null,
    seasons: [{id: 0, name: "Season 1", episodes: []}, {id: 1, name: "Season 2", episodes: []}],
    summary: "A dangerously charming, intensely obsessive young man who goes to extreme measures to insert himself into the lives of those he is transfixed by."
}

test('renders without errors', () => {
    render(<Show />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>)
    const loadingTest = screen.getByTestId("loading-container")
    expect(loadingTest).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', async () => {
    render(<Show show={myShow} selectedSeason={"none"}/>)
    const seasonSelector = screen.getAllByTestId("season-option")
    expect(seasonSelector).toHaveLength(2)
});

test('handleSelect is called when an season is selected', async () => {  
    const handleSelect = jest.fn();
    const user = userEvent.setup();
    render(<Show show={myShow} selectedSeason={"none"} handleSelect={handleSelect}/>)
    const select = screen.getByLabelText(/Select A Season/i);
    await user.selectOptions(select, ["1"]);
    expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', async () => {
    const { rerender } = render(<Show show={myShow} selectedSeason={"none"} />)
    const select = screen.getByLabelText(/Select A Season/i);
    expect(select).toBeInTheDocument();

    rerender(<Show show={myShow} selectedSeason={"1"}/>)
    const episodes = screen.getByTestId("episodes-container")
    expect(episodes).toBeInTheDocument()
});
