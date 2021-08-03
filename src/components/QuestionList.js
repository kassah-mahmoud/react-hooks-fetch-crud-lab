import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import { API_URL } from "./BaseUrl";

function QuestionList() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchQuestions = () => {
    fetch(API_URL + "questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    fetchQuestions();
  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      {loading && <p>Loading....</p>}
      {!loading && (
        <ul>
          {questions.map((q) => (
            <QuestionItem key={q.id} question={q} fetchQuestions={fetchQuestions} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default QuestionList;
