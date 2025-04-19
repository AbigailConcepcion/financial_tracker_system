import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{label}</Tooltip>}
    >
      <Link
        to={to}
        className={`d-flex align-items-center gap-2 px-3 py-2 rounded ${
          isActive ? "bg-primary text-white" : "text-white text-opacity-75"
        } text-decoration-none`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    </OverlayTrigger>
  );
};

export default SidebarLink;
