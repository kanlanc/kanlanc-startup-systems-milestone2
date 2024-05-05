import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const InstructorHomePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [classCodes, setClassCodes] = useState([]);
  const [newClassCode, setNewClassCode] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchClassCodes = async () => {
      const response = await fetch('/api/class-codes');
      const data = await response.json();
      setClassCodes(data);
    };

    if (status === 'authenticated') {
      fetchClassCodes();
    }
  }, [status]);

  const handleCreateClassCode = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/class-codes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ classCode: newClassCode }),
    });

    if (response.ok) {
      setNewClassCode('');
      const data = await response.json();
      setClassCodes(data);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div>
      <h1>Instructor Home Page</h1>

      <section>
        <h2>Create Class Code</h2>
        <form onSubmit={handleCreateClassCode}>
          <input
            type="text"
            value={newClassCode}
            onChange={(e) => setNewClassCode(e.target.value)}
            placeholder="Enter class code"
            required
          />
          <button type="submit">Create</button>
        </form>
      </section>

      <section>
        <h2>Class Codes</h2>
        <ul>
          {classCodes.map((classCode) => (
            <li key={classCode.id}>{classCode.code}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default InstructorHomePage;