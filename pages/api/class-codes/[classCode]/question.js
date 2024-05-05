import { getQuestions, createQuestionForClassCode, deleteQuestion } from '../../../../services/database.mjs';

export default async (req, res) => {
  const { classCode } = req.query;

  if (req.method === 'GET') {
    console.log("Backend qyuestiobs")
    const questions = await getQuestions(classCode);

    console.log("Backend qyuestiobs",questions)

    return res.status(200).json(questions);
  }

  if (req.method === 'POST') {
    const { question, name } = req.body;



    if (!question || !name) {
      console.log(`Name is ${name}`)
      console.log(`Question is ${question}`)
      return res.status(400).json({ message: 'Bad Request: Missing fields' });
    }

    

    const newQuestion = await createQuestionForClassCode(classCode, { question, name });

    // console.log("This is the question from backend question.js ",newQuestion)

    if (!newQuestion) {
      console.log("This is the question from backend question.js ",newQuestion)
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
