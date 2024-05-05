import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Question from "../../components/Question";

export default function classPage() {
  const router = useRouter();
  const { classCode } = router.query;
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");

  async function fetchQuestions() {
    const res = await fetch(`/api/class-codes/${classCode}/question`, {
      method: "GET",
      
    });
    const data = await res.json();
    console.log("Questions", data);
    setQuestions(data);
    setLoading(false);
  }

  useEffect(async () => {
    await fetchQuestions();
  }, [classCode]);

  async function submitQuestion() {
    const newQuestionBody = {
      question: question,
    };
    if (name) {
      newQuestionBody["name"] = name;
    }

    console.log(classCode)
    const res = await fetch(`/api/class-codes/${classCode}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestionBody),
    });
    const data = await res.json();
    setQuestion("");
    setName("");
    setQuestions([...questions, data]);
    await fetchQuestions();
  }

  return (
    <div className="mx-auto px-10 flex flex-col gap-10">
      {loading ? (
        <p>Loading...</p>
      ) : questions == null ? (
        <div>Class {classCode} does not exist</div>
      ) : (
        <>
          <div className="text-5xl mx-auto">{classCode}</div>
          <div className="border rounded shadow-xl flex flex-col p-5 gap-2">
            <div className="text-2xl">New question</div>
            <div> Question </div>
            <input
              className="border rounded p-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></input>
            <div> Your name (optional) </div>
            <input
              className="border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button
              className="bg-black text-white w-52 rounded-md p-2"
              onClick={submitQuestion}
            >
              Submit
            </button>
          </div>
          <div className="border rounded shadow-xl flex flex-col p-5 gap-2">
            <div className="text-2xl">Questions</div>
            {questions.map((question) => (
              <Question
                key={question.id}
                questionId={question.id}
                questionText={question.question}
                name={question.name}
                createdAt={question.createdAt}
  
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
