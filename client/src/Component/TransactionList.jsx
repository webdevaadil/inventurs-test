import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard';

const TransactionList = ({ transactions, deleteTransaction }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filteredTransactions, setfilteredTransactions] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const categories = [
    'All',
    'Salary', 'Freelance', 'Investments', 'Gift', 'Other Income', // Income categories
    'Food', 'Transport', 'Utilities', 'Rent', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other Expense' // Expense categories
  ];


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      console.log(id);

      try {
        const deletedata = axios.delete(`http://localhost:5000/api/auth/transactions/${id}`)
        setMessage('Transaction deleted successfully!');
        setMessageType('success');
        setTimeout(() => {
          setMessage('');
          setMessageType('');
          viewalldata()
        }, 1500);
      } catch (error) {
        console.log(error);

      }

    }
  };

  const viewalldata = async () => {
    const data = await axios.post("http://localhost:5000/api/auth/transactionss", { filterCategory, filterStartDate })
    console.log(data);
    setfilteredTransactions(data.data)

  }
  useEffect(() => {
    viewalldata()
  }, [filterCategory, filterStartDate]);

  return (
    <>
    <div className='d-flex  row topbox'>
        <div className='col-md-2'>   <Dashboard /></div>
      <div className="container py-4 col-md-9">
        <h2 className="text-center mb-4 display-5 fw-bold text-dark">Transaction History</h2>

        <div className="card shadow-sm p-4 mb-4">
          <h3 className="card-title h5 text-dark mb-3">Filters</h3>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="filterCategory" className="form-label">Category:</label>
              <select
                id="filterCategory"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-8">
              <label htmlFor="filterStartDate" className="form-label">Start Date:</label>
              <input
                type="date"
                id="filterStartDate"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="form-control"
              />
            </div>

          </div>
        </div>

        {message && (
          <div className={`alert alert-${messageType} text-center`} role="alert">
            {message}
          </div>
        )}

        {filteredTransactions.length === 0 ? (
          <p className="text-center text-muted fs-5">No transactions found matching your criteria.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow-sm">
              <thead className="table-light">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="text-end">Amount</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.Date}</td>
                    <td>
                      <span className={`badge ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'
                        }`}>
                        {transaction.Type}
                      </span>
                    </td>
                    <td>{transaction.Category}</td>
                    <td>{transaction.Description || '-'}</td>
                    <td className={`text-end ${transaction.type === 'income' ? 'text-success' : 'text-danger'
                      }`}>
                      ${transaction.Amount}
                    </td>
                    <td className="text-end">
                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="btn btn-sm btn-danger"
                        title="Delete transaction"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </>);
};

export default TransactionList
