import withAuth from "../hoc/withAuth";
import { useParams, useLoaderData, useRevalidator } from "react-router-dom";
import fetchOus, { assignOU, designOU } from "../../api_client/fetchOus";
import { designDivision, assignDivision } from "../../api_client/fetchDivision";
import { changeRole } from "../../api_client/fetchUsers";

export async function loader({ params }) {
  return await fetchOus(params.userId);
}

const User = () => {
  const validator = useRevalidator();

  const { ous, user } = useLoaderData();
  const { userId } = useParams();

  const handleDesignDivision = async (userId, divisionId) => {
    await designDivision(userId, divisionId);
    validator.revalidate();
  };

  const handleAssignDivision = async (userId, divisionId) => {
    await assignDivision(userId, divisionId);
    validator.revalidate();
  };

  const DivisionActions = ({ user, division }) => {
    if (user?.divisions?.includes(division?._id)) {
      return (
        <a onClick={() => handleDesignDivision(user._id, division._id)}>
          Design
        </a>
      );
    } else {
      return (
        <a onClick={() => handleAssignDivision(user._id, division._id)}>
          Assign
        </a>
      );
    }
  };

  const handleDesignOU = async (userId, ouID) => {
    await designOU(userId, ouID);
    validator.revalidate();
  };

  const handleAssignOU = async (userId, divisionId) => {
    await assignOU(userId, divisionId);
    validator.revalidate();
  };

  const OUActions = ({ user, ou }) => {
    if (user?.oUs?.includes(ou?._id)) {
      return <a onClick={() => handleDesignOU(user._id, ou._id)}>Design</a>;
    } else {
      return <a onClick={() => handleAssignOU(user._id, ou._id)}>Assign</a>;
    }
  };

  const handleRoleChange = async (e, userId) => {
    const newRole = e.target.value;
    await changeRole(userId, newRole);
    validator.revalidate();
  };

  const RoleAction = ({ user }) => {
    return (
      <div>
        <label>Change User Role</label>
        <select
          defaultValue={user.role}
          onChange={(e) => handleRoleChange(e, user._id)}
        >
          <option value="normal">Normal</option>
          <option value="management">Management</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    );
  };

  return (
    <>
      <h2>{user.username} - {user.role}</h2>
      <RoleAction user={user} />
      <h4>Assign/Design OUs and Divisions</h4>
      <ul className="admin-list">
        {ous.map((ou) => (
          <li key={ou._id}>
            <span className="content">{ou.name}</span>
            <span className="actions">
              <OUActions user={user} ou={ou} />
            </span>
            <ul>
              {ou.divisions.map((division) => (
                <li key={division._id}>
                  <span className="content">{division.name}</span>
                  <span className="actions">
                    <DivisionActions user={user} division={division} />
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withAuth(User);
