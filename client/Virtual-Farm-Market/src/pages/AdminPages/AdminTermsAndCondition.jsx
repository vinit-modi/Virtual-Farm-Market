import React from "react";
import UICms from "../../components/UICms/UICms";

const PAGE_KEY = `terms`;
const PageTitle = `Terms & Conditions`;

function AdminTermsAndCondition() {
  return (
    <div>
      <UICms PAGE_KEY={PAGE_KEY} PageTitle={PageTitle} />
    </div>
  );
}

export default AdminTermsAndCondition;
