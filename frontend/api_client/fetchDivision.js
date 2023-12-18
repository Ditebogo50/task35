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

export const designDivision = async (userId, divisionId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3001/api/users/${userId}/designDivision`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        divisionID: divisionId,
      }),
    }
  );

  return response.json();
};

export const assignDivision = async (userId, divisionId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3001/api/users/${userId}/assignDivision`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        divisionID: divisionId,
      }),
    }
  );

  return response.json();
};

export default fetchDivision;
