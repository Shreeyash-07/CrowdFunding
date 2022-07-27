import React, { useState, useEffect } from "react";
import getBlockchain from "../ethereum";
import { Card, Button, Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const getFactory = async () => {
      const { campaignFactory } = await getBlockchain();
      const campaigns = await campaignFactory.getDeployedCampaigns();
      setCampaigns(campaigns);
    };
    getFactory();
  }, []);
  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Button
        floated="right"
        content="Create Campaign"
        icon="add circle"
        primary
        style={{ marginBottom: "10px" }}
      />
      {campaigns.map((campaign, index) => (
        <Card
          key={index}
          header={campaign}
          description={
            <NavLink to={`/campaign/${campaign}`}>
              <a>View Campaign</a>
            </NavLink>
          }
          fluid={true}
        />
      ))}
    </Layout>
  );
};

export default Home;
