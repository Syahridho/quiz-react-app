export const fetchQuizData = async (amount = 10) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=23&difficulty=easy`
  );
  const data = await response.json();
  return data.results;
};
