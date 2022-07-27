import React, { useState, useEffect } from "react";
import getBlockchain from "../ethereum";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
const New = () => {
  const navigate = useNavigate();
  const [minimumContribution, setminimumContribution] = useState("");
  const [currAC, setcurrAC] = useState("");
  const [signer, setSigner] = useState("");
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    connect();
  }, []);
  const submitCreateCampaign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { campaignFactory, accounts, signer } = await getBlockchain();
      setSigner(signer);
      await campaignFactory.createCampaign(minimumContribution);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
    navigate("/");
  };

  const connect = async () => {
    try {
      if (!window.ethereum) {
        console.log("Metamask not detected");
        return;
      }
      const { accounts } = await getBlockchain();
      setcurrAC(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={submitCreateCampaign} error={!!errorMsg}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => {
              setminimumContribution(e.target.value);
            }}
          />
        </Form.Field>
        <Message error header="Uff...!" content={errorMsg} />
        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default New;
