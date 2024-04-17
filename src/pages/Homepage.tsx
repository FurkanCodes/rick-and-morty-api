import Locations from "../components/Locations/Locations";

import Layout from "../layout/Layout";

function Homepage() {
  return (
    <Layout>
      <div className="content-container">
        <div className="locations-wrapper">
          <Locations />
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
