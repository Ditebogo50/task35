import withAuth from "../hoc/withAuth";
import { Link, useLoaderData } from "react-router-dom";

const UserList = () => {
  const { users } = useLoaderData();
  return (
    <>
      {users && (
        <>
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <Link to={`/user/${user._id}`} state={{ user }}>
                  {user.username}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default withAuth(UserList);
