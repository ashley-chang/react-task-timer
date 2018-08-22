import React from "react";

function Notification(props) {
  return (
    <div className={props.show ? "fade-in notif" : "fade-out notif"}>
      {props.message}
    </div>
  );
}

export default Notification;
