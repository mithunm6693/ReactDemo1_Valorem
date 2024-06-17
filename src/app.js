import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses'

import 'normalize.css/normalize.css';
import './styles/styles.scss';


const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', amount: 1000, note: 'July',createdAt:1 }));
store.dispatch(addExpense({ description: 'Electricity Bill', amount: 800, note: 'July',createdAt:2 }));
store.dispatch(addExpense({ description: 'House Rent', amount: 600, note: 'July',createdAt:3 }));
// store.dispatch(setTextFilter('bill'));

setTimeout(()=>{
    store.dispatch(addExpense({ description: 'Internet Bill', amount: 400, note: 'July',createdAt:4 }));
   
},3000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);





const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);



ReactDOM.render(jsx, document.getElementById('app'));
