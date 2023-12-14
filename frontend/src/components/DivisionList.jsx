import withAuth from "../hoc/withAuth";
import { Link, useLoaderData} from "react-router-dom";

const DivisionList = ({ user }) => {
  const division = useLoaderData();

  return (
    <>
      <h3>Divisions</h3>
      <ul>
        {user?.divisions?.map((division) => (
          <li key={division}>
            <Link to={`/division/${division}`}>{division}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withAuth(DivisionList);
