import React from "react";
import Card from "../../atoms/card/Card";
import Container from "../../atoms/container/Container";

const ClientCardTab = () => {
  const schema = [
    {
      id: 1,
      variant: "fill_light_green",
      txt_1: "38,58",
      desc: "Verified",
    },
    {
      id: 2,
      variant: "fill_red",
      txt_1: "24",
      desc: "Not Verified",
    },
    {
      id: 3,
      variant: "fill_black",
      txt_1: "_",
      desc: "Featured",
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
        <Card variant="full_width">
          MANAGE CLIENTS
        </Card>
      </div>
    </div>
  );
};

export default ClientCardTab;
