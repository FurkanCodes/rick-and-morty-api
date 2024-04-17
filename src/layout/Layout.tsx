import React, { ReactNode } from "react";
import "./Homepage.styles.scss";

interface LayoutProps {
  children: ReactNode; // Define the children prop as ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="content-container">
      <h2>RICK AND MORTY API</h2>

      {children}
    </div>
  );
};

export default Layout;
