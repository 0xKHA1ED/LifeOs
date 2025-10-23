import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const appId = 'default-subscription-tracker';
      const collectionPath = `/artifacts/${appId}/users/${user.uid}/subscriptions`;
      const unsubscribe = onSnapshot(collection(db, collectionPath), (snapshot) => {
        const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscriptions(subs);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setSubscriptions([]);
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (user) {
      const appId = 'default-subscription-tracker';
      const docPath = `/artifacts/${appId}/users/${user.uid}/subscriptions/${id}`;
      await deleteDoc(doc(db, docPath));
    }
  };

  const calculateDaysLeft = (dateString) => {
    const today = new Date();
    const billingDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    billingDate.setHours(0, 0, 0, 0);
    return Math.ceil((billingDate - today) / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };

  const categoryDetails = {
    entertainment: { icon: 'movie', color: 'red' },
    music: { icon: 'music_note', color: 'yellow' },
    work: { icon: 'work', color: 'blue' },
    cloud: { icon: 'cloud', color: 'green' },
    health: { icon: 'fitness_center', color: 'purple' },
    other: { icon: 'label', color: 'gray' },
  };

  const monthlyTotal = subscriptions.reduce((total, sub) => {
    if (sub.billingCycle === 'monthly') {
      return total + sub.price;
    } else if (sub.billingCycle === 'yearly') {
      return total + sub.price / 12;
    }
    return total;
  }, 0);

  const yearlyTotal = subscriptions.reduce((total, sub) => {
    if (sub.billingCycle === 'monthly') {
      return total + sub.price * 12;
    } else if (sub.billingCycle === 'yearly') {
      return total + sub.price;
    }
    return total;
  }, 0);

  return (
    <div id="dashboard-page" className="page active">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-transparent bg-background-light/80 p-4 pb-2 backdrop-blur-sm dark:border-border-dark dark:bg-background-dark/80">
        <div className="w-12"></div>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-text-light">Subscriptions</h1>
        <div className="flex w-12 items-center justify-end">
          <button id="add-new-header-btn" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-900 dark:text-text-light hover:bg-gray-200 dark:hover:bg-hover-dark">
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>
      </header>
      <main className="p-4">
        {!user && (
          <div id="auth-prompt" className="text-center p-6 bg-primary/10 dark:bg-primary/20 rounded-xl mb-6">
            <p>Welcome! Please sign in to manage your subscriptions.</p>
          </div>
        )}

        {user && (
          <div id="dashboard-content">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-text-light">Overview</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-card-light p-4 dark:bg-card-dark">
                  <p className="text-sm font-medium text-gray-600 dark:text-text-dark">Monthly Total</p>
                  <p id="monthly-total" className="mt-1 text-2xl font-bold text-gray-900 dark:text-text-light">{formatCurrency(monthlyTotal, 'USD')}</p>
                </div>
                <div className="rounded-xl bg-card-light p-4 dark:bg-card-dark">
                  <p className="text-sm font-medium text-gray-600 dark:text-text-dark">Yearly Total</p>
                  <p id="yearly-total" className="mt-1 text-2xl font-bold text-gray-900 dark:text-text-light">{formatCurrency(yearlyTotal, 'USD')}</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-text-light">Upcoming Bills</h2>
              <div id="upcoming-bills-list" className="mt-4 space-y-3">
                {loading ? (
                  <p className="text-center text-gray-500 py-4">Loading subscriptions...</p>
                ) : subscriptions.length === 0 ? (
                  <p id="no-subscriptions" className="text-center text-gray-500 py-4">You have no subscriptions yet.</p>
                ) : (
                  subscriptions
                    .sort((a, b) => calculateDaysLeft(a.nextBillingDate) - calculateDaysLeft(b.nextBillingDate))
                    .map(sub => {
                      const daysLeft = calculateDaysLeft(sub.nextBillingDate);
                      const details = categoryDetails[sub.category] || categoryDetails.other;
                      let ringColor, textColor, dueDateText;
                      if (daysLeft < 0) {
                          ringColor = 'ring-gray-500/50';
                          textColor = 'text-gray-500';
                          dueDateText = `Billed ${Math.abs(daysLeft)} days ago`;
                      } else if (daysLeft < 7) {
                          ringColor = 'ring-red-500/50';
                          textColor = 'text-red-500';
                          dueDateText = `Due in ${daysLeft} days`;
                      } else if (daysLeft < 15) {
                          ringColor = 'ring-yellow-500/50';
                          textColor = 'text-yellow-500';
                          dueDateText = `Due in ${daysLeft} days`;
                      } else {
                          ringColor = 'ring-green-500/50';
                          textColor = 'text-green-500';
                          dueDateText = `Due in ${daysLeft} days`;
                      }
                      if (daysLeft === 0) dueDateText = 'Due today';
                      if (daysLeft === 1) dueDateText = 'Due tomorrow';
                      const iconBgColor = `bg-${details.color}-500/10`;
                      const iconTextColor = `text-${details.color}-500`;

                      return (
                        <div key={sub.id} className={`flex items-center gap-4 rounded-xl p-3 ring-2 ${ringColor} bg-card-light dark:bg-card-dark`}>
                          <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${iconBgColor}`}>
                            <span className={`material-symbols-outlined ${iconTextColor}`}>{details.icon}</span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-800 dark:text-text-light">{sub.name}</p>
                            <p className={`text-sm ${textColor}`}>{dueDateText}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-base font-bold text-gray-800 dark:text-text-light">{formatCurrency(sub.price, sub.currency)}</p>
                            <button onClick={() => handleDelete(sub.id)} className="delete-btn text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400">Delete</button>
                          </div>
                        </div>
                      )
                    })
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
