import withAuth from "../hoc/withAuth";
import { useLocation } from "react-router-dom";
import DivisionList from "../components/DivisionList";
import UserList from "../components/UserList";
import fetchUsers from "../../api_client/fetchUsers";

export async function loader() {
  const users = await fetchUsers();
  return { users };
}

const Dashboard = ({user, users}) => {
  const location = useLocation();

  return (
    <>
      <h1>Hi, {user?.username} [{user?.role}]</h1>
      <DivisionList />
      <UserList users={users}/>
    </>
  );
};

export default withAuth(Dashboard);
