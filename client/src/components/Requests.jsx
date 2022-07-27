import React, { useEffect } from "react";
import Layout from "./Layout";
import { NavLink, useParams } from "react-router-dom";
import { Button, Table, Message } from "semantic-ui-react";
import { campaignContract, getAcs } from "../ethereum";
import { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Requests = () => {
  const params = useParams();
  const [requests, setRequests] = useState([]);
  const [approversCount, setApproversCount] = useState("");
  const [requestCount, setRequestCount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchRequests = async () => {
      const campaign = await campaignContract(params.address);
      const requestLength = await campaign.getRequestsCount();

      const requests = await Promise.all(
        Array(parseInt(requestLength))
          .fill()
          .map((element, index) => {
            return campaign.requests(index);
          })
      );
      setRequests(requests);
      const approversCount = await campaign.approversCount();
      const requestCount = await campaign.getRequestsCount();
      setRequestCount(requestCount);
      setApproversCount(approversCount.toString());
    };
    fetchRequests();
  }, [params]);
  const popToast = () => {
    toast("new toast");
  };
  const approveRequest = async (e) => {
    setErrorMessage("");
    try {
      const campaign = await campaignContract(params.address);
      const accounts = await getAcs();
      await campaign.approveRequest(e.target.value, { from: accounts[0] });
      toast("Request Approved");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const finalizeRequest = async (e) => {
    setErrorMessage("");
    try {
      const campaign = await campaignContract(params.address);
      const accounts = await getAcs();
      await campaign.finalizeRequest(e.target.value, { from: accounts[0] });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  const { Header, Row, HeaderCell, Body, Cell } = Table;
  return (
    <Layout>
      <h3>Requests</h3>
      <NavLink to={`/campaign/${params.address}/requests/new`}>
        <Button primary>Add Request</Button>
      </NavLink>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalise</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((request, index) => (
            <Row
              key={index}
              disabled={request.complete}
              positive={
                request.approvalCount >= approversCount / 2 && !request.complete
              }
            >
              <Cell>{index}</Cell>
              <Cell>{request.description}</Cell>
              <Cell>{ethers.utils.formatEther(request.value, "ether")}</Cell>
              <Cell>{request.recipient}</Cell>
              <Cell>
                {request.approvalCount.toString()}/{approversCount}
              </Cell>
              <Cell>
                {request.complete ? null : (
                  <Button
                    color="green"
                    basic
                    style={{ fontFamily: "poppins" }}
                    value={index}
                    onClick={approveRequest}
                  >
                    Approve
                  </Button>
                )}
              </Cell>
              <Cell>
                {request.complete ? null : (
                  <Button
                    color="teal"
                    basic
                    style={{ fontFamily: "poppins" }}
                    value={index}
                    onClick={finalizeRequest}
                  >
                    Finalise
                  </Button>
                )}
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
      <div>Found {requestCount.toString()} requests.</div>
      <ToastContainer />
      <Message error header="Oopss...!" content={errorMessage} />
    </Layout>
  );
};

export default Requests;
