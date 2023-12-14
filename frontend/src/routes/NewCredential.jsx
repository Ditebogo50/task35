import NewCredentialForm from "../components/NewCredentialForm";
import withAuth from "../hoc/withAuth";
import { useParams } from "react-router-dom";

const NewCredential = () => {
  let { divisionId } = useParams();

  return (
    <>
      <NewCredentialForm division={divisionId} />
    </>
  );
};

export default withAuth(NewCredential);
