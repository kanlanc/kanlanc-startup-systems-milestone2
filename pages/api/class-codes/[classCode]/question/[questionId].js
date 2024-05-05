import * as db from "../../../../../services/database.mjs";
export default async function handler(req, res) {
  const { query, method } = req;
  switch (method) {
    case "DELETE":
      console.log("Deleting question", query.questionId);
      await db.deleteQuestion(query.questionId);
      res.status(200).json();
      break;
  }
}
