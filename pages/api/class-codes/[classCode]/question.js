import { getQuestions, createQuestionForClassCode, deleteQuestion } from '../../../../services/database.mjs';

export default async (req, res) => {
  const { classCode } = req.query;

  if (req.method === 'GET') {
    const questions = await getQuestions(classCode);
    return res.status(200).json(questions);
  }

  if (req.method === 'POST') {
    const { question, name } = req.body;

    if (!question || !name) {
      return res.status(400).json({ message: 'Bad Request: Missing fields' });
    }

    const newQuestion = await createQuestionForClassCode(classCode, { question, name });

    if (!newQuestion) {
      return res.status(404).json({ message: 'Invalid Class Code' });
    }

    return res.status(201).json(newQuestion);
  }

  if (req.method === 'DELETE') {
    const { questionId } = req.query;

    if (!questionId) {
      return res.status(400).json({ message: 'Bad Request: Missing questionId' });
    }

    const deletedQuestion = await deleteQuestion(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question Not Found' });
    }

    return res.status(200).json(deletedQuestion);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
};
