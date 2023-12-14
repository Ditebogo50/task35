import EditCredentialForm from "../components/EditCredentialForm";
import withAuth from "../hoc/withAuth";
import { useParams, useLocation } from "react-router-dom";

const EditCredential = () => {
  const { divisionId } = useParams();
  const { state } = useLocation();
  const { credential } = state;
  return (
    <>
      <EditCredentialForm division={divisionId} credential={credential} />
    </>
  );
};

export default withAuth(EditCredential);
