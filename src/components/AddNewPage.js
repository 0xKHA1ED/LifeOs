import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddNewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'USD',
    billingCycle: 'monthly',
    nextBillingDate: new Date().toISOString().split('T')[0],
    category: 'entertainment',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const appId = 'default-subscription-tracker';
      const collectionPath = `/artifacts/${appId}/users/${user.uid}/subscriptions`;
      const newSub = {
        ...formData,
        price: parseFloat(formData.price),
      };
      await addDoc(collection(db, collectionPath), newSub);
      navigate('/');
    }
  };

  return (
    <div id="add-new-page" className="page">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-transparent bg-background-light/80 p-4 pb-2 backdrop-blur-sm dark:border-border-dark dark:bg-background-dark/80">
        <div className="w-12">
          <button onClick={() => navigate(-1)} className="nav-link flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-900 dark:text-text-light hover:bg-gray-200 dark:hover:bg-hover-dark" data-page="dashboard">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-text-light">Add Subscription</h1>
        <div className="w-12"></div>
      </header>
      <main className="p-4">
        <form onSubmit={handleSubmit} id="subscription-form" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-text-dark">Service Name</label>
            <input type="text" id="name" name="name" required placeholder="e.g., Netflix, Spotify" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 bg-card-light text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-card-dark dark:text-text-light" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-text-dark">Price</label>
              <input type="number" id="price" name="price" required min="0" step="0.01" placeholder="9.99" value={formData.price} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 bg-card-light text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-card-dark dark:text-text-light" />
            </div>
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-text-dark">Currency</label>
              <select id="currency" name="currency" value={formData.currency} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 bg-card-light text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-card-dark dark:text-text-light">
                <option>USD</option><option>EUR</option><option>GBP</option><option>EGP</option><option>JPY</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="billing-cycle" className="block text-sm font-medium text-gray-700 dark:text-text-dark">Billing Cycle</label>
              <select id="billing-cycle" name="billingCycle" value={formData.billingCycle} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 bg-card-light text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-card-dark dark:text-text-light">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label htmlFor="next-billing-date" className="block text-sm font-medium text-gray-700 dark:text-text-dark">Next Billing Date</label>
              <input type="date" id="next-billing-date" name="nextBillingDate" required value={formData.nextBillingDate} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 bg-card-light text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-card-dark dark:text-text-light" />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-text-dark">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 bg-card-light text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-card-dark dark:text-text-light">
              <option value="entertainment">Entertainment</option>
              <option value="music">Music</option>
              <option value="work">Work/Productivity</option>
              <option value="cloud">Cloud Storage</option>
              <option value="health">Health & Fitness</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full rounded-xl bg-primary py-3 px-4 font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark">
              Add Subscription
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewPage;
