import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Layout from "./Layout";
import { campaignContract, getAcs } from "../ethereum";
import { ethers } from "ethers";
const RequestNew = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState(params.address);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const { accounts } = await getAcs();
      const campaign = await campaignContract(address);
      console.log(params.address);
      await campaign.createRequest(
        description,
        ethers.utils.parseEther(value),
        recipient,
        {
          from: accounts[0],
        }
      );
      navigate(`/campaign/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <NavLink to={`/campaign/${address}/requests`}>Back</NavLink>
      <h3>Create a request</h3>
      <Form onSubmit={submitRequest} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in ether</label>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
            }}
          />
        </Form.Field>
        <Message error header="Oops...!" content={errorMessage}></Message>
        <Button primary loading={loading}>
          Create Request
        </Button>
      </Form>
    </Layout>
  );
};

export default RequestNew;
