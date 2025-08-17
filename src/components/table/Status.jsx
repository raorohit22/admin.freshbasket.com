import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {(status === "Pending" || status === "Inactive") && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Processing" && <Badge>{status}</Badge>}
        {(status === "Delivered" || status === "Active") && (
          <Badge type="success">{status}</Badge>
        )}
        {status === "Cancel" && <Badge type="danger">{status}</Badge>}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-blue-900 bg-blue-100">{status}</Badge>
        )}
      </span>
    </>
  );
};

export default Status;
