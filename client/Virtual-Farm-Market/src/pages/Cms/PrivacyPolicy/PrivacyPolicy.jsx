import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_CMS_FOR_USER } from "../../../Redux/Reducers/cmsReducer";
import { Typography } from "@mui/material";

const PAGE_KEY = "privacy";

function PrivacyPolicy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cms = useSelector((state) => state.cms);

  useEffect(() => {
    dispatch({ type: GET_CMS_FOR_USER, payload: { titleKey: PAGE_KEY } });
  }, [!cms.cmsDetails]);

  return (
    <>
      {cms.loading && cms.cmsDetails ? null : (
        <div className="main">
          <div className="container">
            <div className="title">
              <Typography variant="h2">{cms.cmsDetails.titleValue}</Typography>
            </div>
            <div className="section">
              <Typography variant="subtitle1">
                {cms.cmsDetails.content}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PrivacyPolicy;
