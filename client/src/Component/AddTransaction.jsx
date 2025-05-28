import React, { useState } from 'react'
import Dashboard from './Dashboard'
import axios from 'axios';

const AddTransaction = () => {
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

  const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other Income'],
    expense: ['Food', 'Transport', 'Utilities', 'Rent', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other Expense'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid positive amount.');
      setMessageType('danger');

      return;
    }
    if (!category) {
      setMessage('Please select a category.');
      setMessageType('danger');

      return;
    }
    if (!date) {
      setMessage('Please select a date.');
      setMessageType('danger');

      return;
    }

    const newTransaction = {
      Type: type,
      Category: category,
      Amount: parseFloat(amount),
      Date: date,
      Description: description,
    };
    try {
      const adddata = await axios.post("http://localhost:5000/api/auth/transactions", newTransaction)

      setMessage('Transaction added successfully!');
      setMessageType('success');
      // Clear form
      setCategory('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setTimeout(() => {
        setMessage('');
        setMessageType('');

      }, 1500);
    } catch (error) {
      setMessage('Plz fill filed');

    }


  };
  return (
    <>
    <div className='d-flex  row topbox' >
        <div className='col-md-2'>   <Dashboard /></div>
<div className="container col-md-8 ">

        <div className="container  py-4 d-flex  align-items-center min-vh-100">
          <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '400px' }}>
            <h2 className="card-title text-center mb-4 h4 text-dark">Add New Transaction</h2>
            {message && (
              <div className={`alert alert-${messageType} text-center`} role="alert">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex justify-content-evenly">
                <label htmlFor="type" className="form-label">Type:</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-select"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="mb-3 d-flex justify-content-evenly">
                <label htmlFor="category" className="form-label">Category:</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  {categories[type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount ($):</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="form-label">Description (Optional):</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>

  )
}

export default AddTransaction
