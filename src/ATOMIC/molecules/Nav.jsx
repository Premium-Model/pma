import React from "react";
import Container from "../atoms/container/Container";
import Icons from "../atoms/icons/Icons";
import Input from "../atoms/input/Input";
import logo from "../../Images/icons/pmLogo.jpg";
import notification from "../../Images/icons/notification.png";
import message from "../../Images/icons/message.png";
import IconLink from "../atoms/link/Link";

const Nav = () => {
  const navSchema = [
    {
      id: 1,
      src: message,
      alt: "message",
      width: 20,
      height: 20,
      href: "...",
    },
    {
      id: 2,
      src: notification,
      alt: "notification",
      width: 20,
      height: 20,
      href: "...",
    },
    {
      id: 3,
      src: logo,
      alt: "logo",
      width: 40,
      height: 40,
      href: "...",
    },
  ];
  return (
    <Container variant="gapped-spaced">
      <div>
        <Input placeholder="search" type="text" variant="search"/>
      </div>
      <Container variant="gapped">
        {navSchema.map((item) => {
          const { src, alt, width, height, id, href } = item;
          return (
            <div key={id}>
              <IconLink to={href}>
                <Icons src={src} width={width} height={height} alt={alt} />
              </IconLink>
            </div>
          );
        })}
      </Container>
    </Container>
  );
};

export default Nav;
