import { fetchUser } from "./fetchUsers";

const fetchOus = async (userId) => {
  const user = await fetchUser(userId);

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3001/api/ous`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const ous = await response.json();

  return {
    user,
    ous,
  };
};

export const designOU = async (userId, ouId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3001/api/users/${userId}/designOU`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ouID: ouId,
      }),
    }
  );

  return response.json();
};

export const assignOU = async (userId, ouId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3001/api/users/${userId}/assignOU`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ouID: ouId,
      }),
    }
  );

  return response.json();
};

export default fetchOus;
