import { Outlet, Link } from "react-router-dom";

const Root = () => {
  const hasToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <>
      {hasToken() && (
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      )}
      <div className="bodyContainer">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
