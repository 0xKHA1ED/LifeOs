import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const appId = 'default-subscription-tracker';
      const docPath = `/artifacts/${appId}/users/${user.uid}/subscriptions/${id}`;
      const docRef = doc(db, docPath);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          setSubscription({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      });
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscription(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const appId = 'default-subscription-tracker';
      const docPath = `/artifacts/${appId}/users/${user.uid}/subscriptions/${id}`;
      const docRef = doc(db, docPath);
      await updateDoc(docRef, subscription);
      navigate('/subscription-tracker');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subscription) {
    return <div>Subscription not found.</div>;
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Subscription</h1>
          <button onClick={() => navigate(-1)} className="nav-link flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-900 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800" data-page="dashboard">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <input type="text" name="name" id="name" value={subscription.name} onChange={handleChange} className="mt-1 block w-full rounded-lg border-slate-300/70 bg-white/50 text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700/70 dark:bg-slate-800/50 dark:text-slate-200 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Price</label>
            <input type="number" name="price" id="price" value={subscription.price} onChange={handleChange} className="mt-1 block w-full rounded-lg border-slate-300/70 bg-white/50 text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700/70 dark:bg-slate-800/50 dark:text-slate-200 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="nextBillingDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Next Billing Date</label>
            <input type="date" name="nextBillingDate" id="nextBillingDate" value={subscription.nextBillingDate} onChange={handleChange} className="mt-1 block w-full rounded-lg border-slate-300/70 bg-white/50 text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700/70 dark:bg-slate-800/50 dark:text-slate-200 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="billingCycle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Billing Cycle</label>
            <select name="billingCycle" id="billingCycle" value={subscription.billingCycle} onChange={handleChange} className="mt-1 block w-full rounded-lg border-slate-300/70 bg-white/50 text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700/70 dark:bg-slate-800/50 dark:text-slate-200 px-3 py-2">
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
            <select name="category" id="category" value={subscription.category} onChange={handleChange} className="mt-1 block w-full rounded-lg border-slate-300/70 bg-white/50 text-slate-900 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700/70 dark:bg-slate-800/50 dark:text-slate-200 px-3 py-2">
              <option value="entertainment">Entertainment</option>
              <option value="music">Music</option>
              <option value="work">Work</option>
              <option value="cloud">Cloud</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="w-full rounded-xl bg-primary py-3 px-4 font-bold text-white shadow-glow hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark">Save Changes</button>
        </form>
      </div>
    </main>
  );
};

export default EditSubscriptionPage;
