import { useLoaderData, Link, useParams } from "react-router-dom";

const Credentials = ({ user }) => {
  const { division } = useLoaderData();
  const { divisionId } = useParams();

  return (
    <>
      <h3>{division.name}</h3>
      <h4>Credentials</h4>
      <ul>
        {division?.credentials?.map((credential, index) => {
          return (
            <li key={`credential.username-${index}`}>
              <span>
                {credential.username}:{credential.password}
              </span>

              {["management", "admin"].includes(user?.role) && (
                <Link
                  to={`/division/${divisionId}/editCredential`}
                  state={{ credential }}
                >
                  Edit
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Credentials;
