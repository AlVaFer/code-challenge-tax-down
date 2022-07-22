import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export const withRouter = (Child) => {
  return (props) => {
    const navigate = useNavigate();
    const params = useParams();
    return <Child {...props} navigate={navigate} params={params} />;
  };
};
