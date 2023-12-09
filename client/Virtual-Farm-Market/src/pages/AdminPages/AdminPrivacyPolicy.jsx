import React from "react";
import UICms from "../../components/UICms/UICms";

const PAGE_KEY = `privacy`;
const PageTitle = `Privacy Policy`;

function AdminPrivacyPolicy() {
  return (
    <div>
      <UICms PAGE_KEY={PAGE_KEY} PageTitle={PageTitle} />
    </div>
  );
}

export default AdminPrivacyPolicy;
