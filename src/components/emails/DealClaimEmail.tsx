import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
  Section,
  Img,
  Hr,
} from '@react-email/components';

// Note: You'll need to install the package first:
// npm install @react-email/components
// or
// yarn add @react-email/components

interface DealClaimEmailProps {
  userName: string;
  restaurantName: string;
  dealTitle: string;
  confirmationId: string;
  expiryDate: Date;
  dealDescription?: string;
}

export const DealClaimEmail = ({
  userName,
  restaurantName,
  dealTitle,
  confirmationId,
  expiryDate,
  dealDescription,
}: DealClaimEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your deal claim confirmation from {restaurantName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://your-logo-url.com/logo.png"
            width="150"
            height="50"
            alt="Playful Bites Boston"
            style={logo}
          />
          <Heading style={heading}>Deal Claim Confirmation</Heading>
          <Text style={paragraph}>Hi {userName},</Text>
          <Text style={paragraph}>
            Your deal has been successfully claimed at {restaurantName}!
          </Text>
          <Section style={dealSection}>
            <Text style={dealTitle}>{dealTitle}</Text>
            {dealDescription && <Text style={paragraph}>{dealDescription}</Text>}
            <Text style={confirmationText}>
              Confirmation ID: <strong>{confirmationId}</strong>
            </Text>
            <Text style={expiryText}>
              Must be redeemed on: {new Date(expiryDate).toLocaleDateString()}
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={instructions}>
            To redeem your deal, simply show this email or your confirmation ID to
            the restaurant staff.
          </Text>
          <Button style={button} href="https://playfulbitesboston.com/my-deals">
            View My Deals
          </Button>
          <Text style={footer}>
            © 2024 Playful Bites Boston. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const logo = {
  margin: '0 auto',
  marginBottom: '24px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  textAlign: 'center' as const,
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const dealSection = {
  padding: '24px',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  marginBottom: '24px',
};

const dealTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#000000',
  marginBottom: '12px',
};

const confirmationText = {
  fontSize: '16px',
  color: '#484848',
  marginBottom: '8px',
};

const expiryText = {
  fontSize: '14px',
  color: '#666666',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const instructions = {
  fontSize: '14px',
  color: '#666666',
  marginBottom: '24px',
};

const button = {
  backgroundColor: '#5C45FF',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  margin: '0 auto',
};

const footer = {
  color: '#898989',
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '32px',
  textAlign: 'center' as const,
};

export default DealClaimEmail;