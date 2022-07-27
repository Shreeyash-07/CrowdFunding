import { ethers } from "ethers";
import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { campaignContract, getAcs } from "../ethereum";
const ContributeForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setvalue] = useState(0);
  const [address, setAddress] = useState(props.address);
  const SubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const { accounts } = await getAcs();
      const campaign = await campaignContract(address);
      const options = {
        from: accounts[0],
        value: ethers.utils.parseEther(value).toString(),
      };
      await campaign.contribute(options);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
    setvalue(0);
  };
  return (
    <Form onSubmit={SubmitForm} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(e) => {
            setvalue(e.target.value);
          }}
        />
      </Form.Field>
      <Message error header="Ooops...!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
