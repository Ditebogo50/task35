const fetchDivision = async (divisionId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3001/api/divisions/${divisionId}/credentials`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export default fetchDivision;
