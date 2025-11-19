import React, { useState } from 'react';
import nlp from 'compromise';

const QuickAdd = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const doc = nlp(text);
      const title = doc.not('#Date|#Value|#Preposition|#HashTag').text();
      const dates = doc.dates().get();
      const dueDate = dates.length > 0 ? dates[0] : null;
      const priorityMatch = doc.match('p[1-4]').out('array');
      const priority = priorityMatch.length > 0 ? parseInt(priorityMatch[0].replace('p', '')) : 4;
      const tags = doc.hashTags().out('array');

      onAddTask({
        title,
        due_date: dueDate,
        priority,
        tags,
        is_completed: false,
        created_at: new Date(),
      });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quick Add: Review PR tomorrow at 4pm p1 #work"
        className="w-full p-4 text-sm font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-black focus:shadow-neo transition-all duration-200 placeholder:text-slate-400"
      />
    </form>
  );
};

export default QuickAdd;
