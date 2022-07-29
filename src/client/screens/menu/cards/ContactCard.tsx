import * as React from 'react';
import { Card, Paragraph } from 'react-native-paper';
import { EmailLink } from 'src/client/components/EmailLink';
import { StyledCard } from 'src/client/components/StyledCard';

export function ContactCard(): React.ReactElement {
  return (
    <StyledCard>
      <Card.Title title="Contact us" />
      <Card.Content>
        <Paragraph>
          We'd love to hear from you! Email us at{' '}
          <EmailLink emailUser="contact" subject="Hello" />
        </Paragraph>
      </Card.Content>
    </StyledCard>
  );
}
