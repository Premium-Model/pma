import React from "react";
import Icons from "../atoms/icons/Icons";
import Input from "../atoms/input/Input";
import Container from "../atoms/container/Container";

const IconInput = ({
  container = {},
  leftIcon = {},
  rightIcon = {},
  input={},
  variant,
  classname,
}) => {
  switch (variant) {
    case value:
      
      break;
  
    default:
      break;
  }
  return (
    <Container {...container}>
      <Icons {...leftIcon}/>
      <Input {...input}/>
      <Icons {...rightIcon}/>
    </Container>
  );
};

export default IconInput;
