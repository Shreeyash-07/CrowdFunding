import React, { useEffect } from "react";
import Layout from "./Layout";
import { NavLink, useParams } from "react-router-dom";
import { campaignContract } from "../ethereum";
import { useState } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import { ethers } from "ethers";
import ContributeForm from "./ContributeForm";
const Show = () => {
  const params = useParams();
  const [minimumContribution, setminimumContribution] = useState("");
  const [balance, setBalance] = useState("");
  const [requestCount, setRequestCount] = useState("");
  const [approversCount, setApproversCount] = useState("");
  const [manager, setManager] = useState("");
  useEffect(() => {
    const fetchSummary = async () => {
      const campaign = await campaignContract(params.address);
      campaign
        .getSummary()
        .then((summary) => {
          setminimumContribution(summary[0]);
          setBalance(ethers.utils.formatUnits(summary[1], "ether"));
          setRequestCount(summary[2]);
          setApproversCount(summary[3]);
          setManager(summary[4]);
        })
        .catch((err) => {
          console.log({ underError: err });
        });
    };
    fetchSummary();
  }, [params]);

  const items = [
    {
      header: manager,
      meta: "Address of manager",
      description:
        "The manager created this campaign and can create requests to withdraw money",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution.toString(),
      meta: "Minimum Contribution (wei)",
      description: "You must contribute at least this much to become approver",
    },
    {
      header: requestCount.toString(),
      meta: "Number of Requests",
      description: "A request tries to withdraw money from the contract. ",
    },
    {
      header: approversCount.toString(),
      meta: "Number of Approvers",
      description:
        "Number of people who have already donated to this campaign ",
    },
    {
      header: balance,
      meta: "Campaign Balance(ether)",
      description:
        "The balance is how much money this campaign has left to spend",
    },
  ];
  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={params.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <NavLink to={`/campaign/${params.address}/requests`}>
              <Button primary>View Requests</Button>
            </NavLink>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Show;
