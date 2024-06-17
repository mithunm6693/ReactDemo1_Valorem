import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import 'react-dates/lib/css/_datepicker.css'

const now = moment();


export default class ExpenseForm extends React.Component {
    state = {
        description: '',
        note: '',
        amount: '',
        createdAt: moment(),
        calendarFocused: false,
        error:''
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        // Regex to allow up to two decimal places
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChnage = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };



    onSubmit = (e) => {
        e.preventDefault(); // Prevents default form submission

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please fill description and amount!!' }));
        }else {
            this.setState(()=>({error:''}));
            this.props.onSubmit({
                description:this.state.description,
                amount:parseFloat(this.state.amount,10),
                createdAt:this.state.createdAt.valueOf(),
                note:this.state.note
            });
        }

        // Clear the form fields after submission if needed
        this.setState({
            description: '',
            note: '',
            amount: ''
        });
    };

    render() {
        return (
            <div>
                <h2>Add Expense</h2>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        placeholder="Description"
                        autoFocus
                        required
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />

                    <input
                        type='text'
                        placeholder="Amount"
                        required
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />

                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChnage}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />

                    <textarea
                        placeholder="Add a note (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />

                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}
