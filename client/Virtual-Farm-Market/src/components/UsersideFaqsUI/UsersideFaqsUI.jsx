import React from "react";
import "./UsersideFaqsUI.css"; // Updated path to the CSS file
import { Button, CircularProgress, colors } from "@mui/material";
import { red, yellow } from "@mui/material/colors";

function UsersideFaqsUI(props) {
  const { faqs } = props;

  const handleToggle = (index) => {
    const contentDiv = document.getElementsByClassName("content");
    const toggles = document.getElementsByClassName("toggle");
    const icons = document.getElementsByClassName("icon");

    for (let i = 0; i < contentDiv.length; i++) {
      if (i === index) {
        if (
          parseInt(contentDiv[i].style.height, 10) !==
          contentDiv[i].scrollHeight
        ) {
          contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
          toggles[i].style.color = colors.green[400];
          icons[i].classList.remove("fa-plus");
          icons[i].classList.add("fa-minus");
        } else {
          contentDiv[i].style.height = "0px";
          toggles[i].style.color = "#111130";
          icons[i].classList.remove("fa-minus");
          icons[i].classList.add("fa-plus");
        }
      } else {
        contentDiv[i].style.height = "0px";
        toggles[i].style.color = "#111130";
        icons[i].classList.remove("fa-minus");
        icons[i].classList.add("fa-plus");
      }
    }
  };

  return (
    <>
      <div className="containert mt-3 w-75">
        {faqs ? (
          faqs.map((faq, index) => (
            <div className="wrapper" key={index}>
              <button className="toggle" onClick={() => handleToggle(index)}>
                {faq.question}
                <i className="fas fa-plus icon"></i>
              </button>
              <div className="content">
                <p>{faq.answer}</p>
              </div>
              {props.updateKey && (
                <>
                  <div className="d-flex justify-content-end me-2">
                    <Button
                      variant="contained"
                      disableElevationa
                      sx={{
                        color: "white",
                        bgcolor: yellow[900],
                        "&:hover": {
                          bgcolor: yellow[800],
                        },
                      }}
                      onClick={() => props.handleUpdate(faq._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{
                        marginLeft: 1,
                        "&:hover": {
                          color: "white",
                          bgcolor: red[500],
                        },
                      }}
                      onClick={() => props.handleDelete(faq._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
}

export default UsersideFaqsUI;
