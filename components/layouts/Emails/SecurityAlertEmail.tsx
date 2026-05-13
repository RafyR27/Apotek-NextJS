import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Tailwind,
  Preview,
} from "@react-email/components";

interface SecurityAlertEmailProps {
  email: string;
  username: string;
  changePasswordUrl: string;
  attemptTime: string;
}

const SecurityAlertEmail = (props: SecurityAlertEmailProps) => {
  const {
    email,
    username,
    changePasswordUrl,
    attemptTime,
  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          Someone tried to create an ApotekKart account with your email
        </Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-150 mx-auto px-8 py-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                ApotekKart
              </Text>
            </Section>

            {/* Main Content */}
            <Section>
              <Heading className="text-[20px] font-semibold text-gray-900 mb-4 mt-0">
                Account Creation Attempt Detected
              </Heading>

              <Text className="text-[16px] text-gray-700 leading-6 mb-4 mt-0">
                Hi {username},
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 mb-4 mt-0">
                Someone attempted to create an ApotekKart account using your
                email address &quot;{email}&quot;. If this was you, no
                action is needed and you can safely ignore this email.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 mb-6 mt-0">
                If you didn&apos;t try to create an account, this could mean:
              </Text>

              <Section className="bg-gray-50 rounded-[6px] p-4 mb-6">
                <Text className="text-[14px] text-gray-600 leading-5 m-0 mb-2">
                  • Someone mistakenly used your email address
                </Text>
                <Text className="text-[14px] text-gray-600 leading-5 m-0 mb-2">
                  • You may already have an ApotekKart account
                </Text>
                <Text className="text-[14px] text-gray-600 leading-5 m-0">
                  • Someone is trying to use your email without permission
                </Text>
              </Section>

              {/* Security Warning */}
              <Section className="border-l-4 border-orange-400 pl-4 mb-6">
                <Text className="text-[14px] text-orange-700 font-medium leading-5 m-0 mb-2">
                  Security Tip
                </Text>
                <Text className="text-[14px] text-gray-600 leading-5 m-0">
                  If you suspect suspicious activity, we recommend changing your
                  password and enabling two-factor authentication on any
                  existing accounts you may have.
                </Text>
              </Section>

              {/* Action Button */}
              <Section className="text-center mb-8">
                <Button
                  href={changePasswordUrl}
                  className="bg-blue-600 text-white px-6 py-3 rounded-[6px] text-[14px] font-medium no-underline box-border"
                >
                  Reset Password
                </Button>
              </Section>

              <Hr className="border-gray-200 my-6" />

              {/* Attempt Details */}
              <Section className="mb-6">
                <Text className="text-[14px] text-gray-500 font-medium mb-2 mt-0">
                  Attempt Details:
                </Text>
                <Text className="text-[12px] text-gray-500 leading-4 m-0 mb-1">
                  Time: {attemptTime}
                </Text>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-5 mb-2 mt-0">
                Questions? Contact our support team at support@apotekkart.com
              </Text>

              <Text className="text-[14px] text-gray-600 leading-5 m-0">
                Best regards,
                <br />
                The ApotekKart Security Team
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-gray-200 my-8" />
            <Section>
              <Text className="text-[12px] text-gray-400 text-center leading-4 m-0 mb-2">
                ApotekKart - Your Trusted Online Pharmacy
              </Text>
              <Text className="text-[12px] text-gray-400 text-center leading-4 m-0 mb-2">
                Jl. Pharmacy Street No. 123, Jakarta, Indonesia
              </Text>
              <Text className="text-[12px] text-gray-400 text-center leading-4 m-0">
                © 2024 ApotekKart. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SecurityAlertEmail;
