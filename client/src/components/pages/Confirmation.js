import React from "react";
import 'materialize-css';
import {Card, Row, Col } from 'react-materialize';

const Confirmation = () => {
  return (
    <Row>
      <Col s={12} className="section">
        <Card title="Account created!">
            <p>
              You should have been sent an email from us to confirm the account.
              You will not be able to log in until you confirm.
            </p>
            <br />
            <p>Do you need us to resend the confirmation link?</p>

        </Card>
      </Col>
    </Row>
  );
};

export default Confirmation;
