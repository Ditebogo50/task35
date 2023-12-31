import withAuth from "../hoc/withAuth";
import Credentials from "../components/Credentials";
import fetchDivision from "../../api_client/fetchDivision";
import { Link, useParams } from "react-router-dom";

export async function loader({ params }) {
  const division = await fetchDivision(params.divisionId);
  return { division };
}

const Division = ({ user }) => {
  let { divisionId } = useParams();

  return (
    <>
      <Credentials user={user} />
      <div className="new-credential">
        <Link to={`/division/${divisionId}/newCredential`}>
          Add New Credential
        </Link>
      </div>
    </>
  );
};

export default withAuth(Division);
