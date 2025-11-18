import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const calculateDaysLeft = (dateString, billingCycle) => {
    const today = new Date();
    let billingDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    billingDate.setHours(0, 0, 0, 0);

    while (billingDate < today) {
      if (billingCycle === 'monthly') {
        billingDate.setMonth(billingDate.getMonth() + 1);
      } else if (billingCycle === 'yearly') {
        billingDate.setFullYear(billingDate.getFullYear() + 1);
      } else {
        // Default to monthly if cycle is not set or invalid
        billingDate.setMonth(billingDate.getMonth() + 1);
      }
    }
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
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Subscriptions</h1>
        </header>
        {!user && (
          <div id="auth-prompt" className="text-center p-6 bg-primary/10 dark:bg-primary/20 rounded-xl mb-6">
            <p>Welcome! Please sign in to manage your subscriptions.</p>
          </div>
        )}
        {user && (
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Total</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(monthlyTotal, 'USD')}</p>
                </div>
                <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Yearly Total</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(yearlyTotal, 'USD')}</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Upcoming Bills</h2>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-center text-slate-500 py-4">Loading subscriptions...</p>
                ) : subscriptions.length === 0 ? (
                  <p className="text-center text-slate-500 py-4">You have no subscriptions yet.</p>
                ) : (
                  subscriptions
                    .sort((a, b) => calculateDaysLeft(a.nextBillingDate, a.billingCycle) - calculateDaysLeft(b.nextBillingDate, b.billingCycle))
                    .map(sub => {
                      const daysLeft = calculateDaysLeft(sub.nextBillingDate, sub.billingCycle);
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
                        <Link to={`/subscription-tracker/edit/${sub.id}`} key={sub.id} className={`flex items-center gap-4 rounded-xl p-3 ring-2 ${ringColor} bg-glass-light dark:bg-glass-dark backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md`}>
                          <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${iconBgColor}`}>
                            <span className={`material-symbols-outlined ${iconTextColor}`}>{details.icon}</span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{sub.name}</p>
                            <p className={`text-sm ${textColor}`}>{dueDateText}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-base font-bold text-slate-800 dark:text-slate-200">{formatCurrency(sub.price, sub.currency)}</p>
                            <button onClick={(e) => { e.preventDefault(); handleDelete(sub.id); }} className="delete-btn text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400">Delete</button>
                          </div>
                        </Link>
                      )
                    })
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
