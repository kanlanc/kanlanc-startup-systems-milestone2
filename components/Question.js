


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

{/* CS5356 TODO 1a. Navigation

        Create a component to represent a Question which should display
        the question text, the optional name of the person who 
        submitted the question, and the date & time when the question
        was submitted.

        This component should also allow an Instructor to delete a
        question, but an anonymous user shouldn't be able to. You can
        delete a question by making a DELETE /api/class-codes/[classCode]/question
        with the questionId
       */}

const Question = ({ questionId, questionText, name, createdAt }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { classCode } = router.query;

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/class-codes/${classCode}/question`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId }),
      });

      if (response.ok) {
        // Optionally, you can refresh the question list after deleting the question
        // For example, you can call a function to refetch the questions
        // or update the state of the parent component
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      <p>{questionText}</p>
      {name && <p>Asked by: {name}</p>}
      <p>Submitted at: {new Date(createdAt).toLocaleString()}</p>
      {status === 'authenticated' && session.user.role === 'instructor' && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default Question;
