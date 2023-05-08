import React from "react";
import Card from "../../atoms/card/Card";
import Container from "../../atoms/container/Container";

const ClientCardTab = ({ client }) => {
  const isVerified = client.filter((item) => item.isVerified);
  const notVerified = client.filter((item) => !item.isVerified);
  const schema = [
    {
      id: 1,
      variant: "fill_light_green-md",
      txt_1: isVerified.length,
      desc: "Verified",
    },
    {
      id: 2,
      variant: "fill_red-md",
      txt_1: notVerified.length,
      desc: "Not Verified",
    },
  ];

  
  return (
    <div>
      <Container variant="flexed">
        {schema.map((item) => {
          const { id, variant, txt_1, desc } = item;
          return (
            <Card key={id} variant={variant}>
              <p>{txt_1}</p>
              <p>{desc}</p>
            </Card>
          );
        })}
      </Container>
      <div>
        <Card variant="full_width">MANAGE CLIENTS</Card>
      </div>
    </div>
  );
};

export default ClientCardTab;
