import React, { lazy } from "react";
import { useNavigate } from "react-router-dom";
const CreateTicket = lazy(() => import("../pages/CreateTicket"));

const CreateTicketWrapper = () => {
  const navigate = useNavigate();
  return <CreateTicket navigate={navigate} />;
};

export default CreateTicketWrapper;
