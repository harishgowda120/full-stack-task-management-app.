import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMenu = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(true);  // Default to true
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
       await axios.post('https://full-stack-task-management-app-2-bw9j.onrender.com/api/menu/', {
        name,
        category,
        price,
        availability,
      });

      setSuccessMessage('Menu item added successfully!');
      // Optionally, reset form fields after success
      setName('');
      setCategory('');
      setPrice('');
      setAvailability(true);

      // Redirect to menu page or another page if needed
      navigate('/menu');
    } catch (error) {
      setErrorMessage('Failed to add the menu item. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Add Menu Item</h2>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="form-group mb-4">
                  <label htmlFor="name" className="form-label">Item Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control py-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Category Input */}
                <div className="form-group mb-4">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input
                    type="text"
                    id="category"
                    className="form-control py-3"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                {/* Price Input */}
                <div className="form-group mb-4">
                  <label htmlFor="price" className="form-label">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    className="form-control py-3"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                  />
                </div>

                {/* Availability Checkbox */}
                <div className="form-group mb-4">
                  <label htmlFor="availability" className="form-label">Availability</label>
                  <select
                    id="availability"
                    className="form-select py-3"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value === 'true')}
                    required
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 py-3">
                  Add Menu Item
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  className="btn btn-secondary w-100 py-3"
                  onClick={() => navigate('/menu')}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
