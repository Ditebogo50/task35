const fetchUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3001/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if(response.status == 403) {
    return null;
  }
  return response.json();
};

export const fetchUser = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const changeRole = async (userID, newRole) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3001/api/users/${userID}/change_role`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newRole,
      }),
    }
  );

  return response.json();
};

export default fetchUsers;
