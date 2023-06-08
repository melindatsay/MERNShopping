// import React from 'react'
// import {Container, Row, Col} from 'react-bootstrap'

// const Footer = () => {
//   return (
//     <footer>
//     <Container>
//         <Row>
//             <Col className='text-center py-3'>
//                 Copyright &copy; ShopLead
//             </Col>
//         </Row>
//     </Container>

//     </footer>
//   )
// }
// export default Footer;
import React from "react";
// import {
//   MailOutline,
//   Phone,
//   Pinterest,
//   Room,
//   Twitter,
// } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import styled from "styled-components";
import { mobile } from "../mobile.js";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  border-right: solid lightgray;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${"" /* margin: 20px; */}
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Logo = styled.h1`
  font-size: 35px;
  padding: 0px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 13px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0%;
  color: black;
  ${"" /* background-color: #${(props) => props.color}; */}
  ${"" /* background-color: black; */}
  display: flex;
  align-items: center;
  justify-content: left;
  margin-right: 20px;
`;

const Center = styled.div`
  border-right: solid lightgray;
  flex: 1;
  padding: 20px;
  ${"" /* margin: 20px; */}
  ${mobile({ display: "none" })}
`;

const Title = styled.h5`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-size: 13px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${"" /* margin: 20px; */}
  ${mobile({ backgroundColor: "#fff8f8" })};
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 13px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>. H O M E &nbsp;&nbsp;&nbsp;R E T R O</Logo>
        <Desc>
          Nulla dignissim odio vitae tortor tempus suscipit. Duis consectetur
          laoreet sapien, quis dictum erat pulvinar sit amet. Duis quis mauris
          blandit, vulputate diam nec, vestibulum elit.
        </Desc>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>About Us</ListItem>
          <ListItem>FAQs</ListItem>
          <ListItem>Delivery</ListItem>
          <ListItem>Returns</ListItem>
          <ListItem>Careers</ListItem>
          <ListItem>Gift Cards</ListItem>
          <ListItem>Contact Us</ListItem>
          <ListItem>Privacy Policy</ListItem>
          <ListItem>Cookie Policy</ListItem>
          <ListItem>Terms & Condition</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} /> 155 New Bond St, London
          W1S 2UA, UK
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} /> +44 20 7499 8858
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon style={{ marginRight: "10px" }} />{" "}
          contact@sunnyday.co.uk
        </ContactItem>
        <SocialContainer>
          <SocialIcon color="'00000'">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color='E60023'>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Right>
    </Container>
  );
};

export default Footer;
