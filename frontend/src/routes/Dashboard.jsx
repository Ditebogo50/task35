import withAuth from "../hoc/withAuth";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  return (
    <>
      <h1>Welcome to the Dashboard</h1>
    </>
  );
};

export default withAuth(Dashboard);
