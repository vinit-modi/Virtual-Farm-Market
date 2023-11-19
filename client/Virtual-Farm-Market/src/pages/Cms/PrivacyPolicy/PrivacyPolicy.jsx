import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_CMS_FOR_USER,
  GET_CMS_FOR_USER,
} from "../../../Redux/Reducers/cmsReducer";

import CmsLayout from "../../../components/CmsLayout/CmsLayout";

const PAGE_KEY = "privacy";

function PrivacyPolicy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cms = useSelector((state) => state.cms);

  useEffect(() => {
    dispatch({ type: GET_CMS_FOR_USER, payload: { titleKey: PAGE_KEY } });
  }, [!cms.cmsDetails]);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_CMS_FOR_USER });
    };
  }, []);

  // style={{ whiteSpace: "pre-line" }}
  return (
    <>
      {cms.loading && !cms.cmsDetails ? null : (
        <>
          <CmsLayout
            title={cms.cmsDetails?.titleValue}
            content={cms.cmsDetails?.content}
          />
        </>
      )}
    </>
  );
}

export default PrivacyPolicy;
