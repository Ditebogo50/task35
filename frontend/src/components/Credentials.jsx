import { useLoaderData, Link, useParams } from "react-router-dom";

const Credentials = ({ user }) => {
  const { division } = useLoaderData();
  const { divisionId } = useParams();

  return (
    <>
      <h3>{division.name} Credentials</h3>
      <ul className="admin-list">
        {division?.credentials?.map((credential, index) => {
          return (
            <li key={`credential.username-${index}`}>
              <span className="content">
                {credential.username}:{credential.password}
              </span>

              <span className="actions">
                {["management", "admin"].includes(user?.role) && (
                  <Link
                    to={`/division/${divisionId}/editCredential`}
                    state={{ credential }}
                  >
                    Edit
                  </Link>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Credentials;
