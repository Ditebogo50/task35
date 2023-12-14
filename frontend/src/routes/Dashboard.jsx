import withAuth from "../hoc/withAuth";
import { useLocation } from "react-router-dom";
import DivisionList from "../components/DivisionList";

const Dashboard = () => {
  const location = useLocation();

  return (
    <>
      <h1>Welcome to the Dashboard</h1>
      <DivisionList />
    </>
  );
};

export default withAuth(Dashboard);
