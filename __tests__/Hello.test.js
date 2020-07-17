import React from 'react';
import { render } from 'react-native-testing-library';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Hello from '../Hello';
import CategorySelector from '../components/CategorySelector'
import eventsReducer from '../store/reducers/events'
import userReducer from '../store/reducers/user';

/* Testing  Text
    render()        -> renders the component to in memory, doesn't require a simulator
    queryByText()   -> finds a child component that has the passed in text
    expect()        -> creates a Jest expectation to check a condition
    .not.toBeNull() -> checks that the value isn't null i.e. the element with specified text was found
*/

describe('Hello', () => {
    it('renders correct static text', () => {
        const { queryByText } = render(<Hello />);
        expect(queryByText('Hello, world!')).not.toBeNull();
    });
    it('displays the passed-in name', () => {
        const { queryByText } = render(<Hello name="Matt" />);
        expect(queryByText('Hello, Matt!')).not.toBeNull();
    });
});

/* Test Component that accesses Redux State
    1. Create rootReducer like how we have in App.js
    2. Create a store with the rootReducer
    3. Wrap component you want to test with a provider
        3.a pass the store you made a prop to the Provider
    4. Run expectations after rendering desired Component
*/

describe('CategorySelector', () => {
    // Test if the reset filters button text is rendered
    it('renders Reset Filters Button text', () => {
        const rootReducer = combineReducers({
            events: eventsReducer,
            user: userReducer
        });

        const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
        const { queryByText } = render(
            <Provider store={store} >
                <CategorySelector />
            </Provider>
        );
        expect(queryByText('Reset Filters')).not.toBeNull();
    });
});


