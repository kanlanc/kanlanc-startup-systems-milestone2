import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ClassCodePage = () => {
  const router = useRouter();
  const { classCode } = router.query;

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');

  const fetchQuestions = async () => {
    if (classCode) {
      const response = await fetch(`/api/class-codes/${classCode}/question`);
      const data = await response.json();
      setQuestions(data);
    }
  };

  useEffect(() => {
    

    fetchQuestions();
  }, [classCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/class-codes/${classCode}/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, name }),
    });

    if (response.ok) {
      setQuestion('');
      setName('');
      const data = await response.json();
      setQuestions(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
        />
        <button type="submit">Submit Question</button>
      </form>

      <ul>
            {questions.map((question) => (
                <li key={question.id}>
                <Question
                    questionId={question.id}
                    questionText={question.text}
                    name={question.name}
                    createdAt={question.createdAt}
                    onDelete={fetchQuestions}
                />
                </li>
            ))}
        </ul>
    </div>
  );
};

export default ClassCodePage;