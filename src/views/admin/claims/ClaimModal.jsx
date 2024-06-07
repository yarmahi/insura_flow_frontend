import React from "react";
import Input from "antd/es/input/Input";

const ClaimModal = (claim) => {
  console.log(claim);
  return (
    <div className="mt-40 absolute">
      <p>{claim.claim_id}</p>
    </div>
  );
};

export default ClaimModal;
