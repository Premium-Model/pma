import React from "react";
import Card from "../../atoms/card/Card";
import Container from "../../atoms/container/Container";

const AgencyCardTab = () => {
  const schema = [
    {
      id: 1,
      variant: "fill_light_green",
      txt_1: "2,457",
      desc: "Activated",
    },
    {
      id: 2,
      variant: "fill_red",
      txt_1: "78",
      desc: "Not Activated",
    },
    {
      id: 3,
      variant: "fill_black",
      txt_1: "250",
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
        <Card variant="full_width">MANAGE AGENCY</Card>
      </div>
    </div>
  );
};

export default AgencyCardTab;
