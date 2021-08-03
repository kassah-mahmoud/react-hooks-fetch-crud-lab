import React, { useState } from "react";
import { API_URL } from "./BaseUrl";

function QuestionItem({ question, fetchQuestions }) {

  const [loading, setLoading] = useState(false)

  const { id, prompt, answers, correctIndex } = question;


  const deleteQuestion = (id) => {
    setLoading(true);
    fetch(`${API_URL}questions/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => fetchQuestions())
    .finally(() => setLoading(false))
  }

  const updateQuestion = (id, newData) => {
    setLoading(true);
    fetch(`${API_URL}questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(() => fetchQuestions())
    .finally(() => setLoading(false))
  }

  const handleChangeCorrectAnswer = (event) => {
    const newCorrectIndex = event.target.value;

    if (newCorrectIndex >= 0 && newCorrectIndex < 4)  {
      updateQuestion(id, {
        correctIndex: newCorrectIndex
      })
    }
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeCorrectAnswer}>{options}</select>
      </label>
      <button disabled={loading} onClick={() => deleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
