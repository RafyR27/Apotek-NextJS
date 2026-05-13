import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  verifyUrl: string;
  email: string
}

export function VerificationEmail(props: VerificationEmailProps) {
  const { username, email, verifyUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Preview>
        Verify your email address to complete your ApotekKart account setup
      </Preview>
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-150 mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <a className="text-primary font-heading font-bold text-[1.4rem]">
                ApotekKart
              </a>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Heading className="text-[24px] font-bold text-gray-900 mb-4">
                Verify Your Email Address
              </Heading>

              <Text className="text-[16px] text-gray-700 leading-6 mb-4">
                Hello,
                <br></br>
                <br></br>
                We received a request to create or continue setting up an
                ApotekKart account using this email address.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 mb-6">
                If you previously created an account with this email address,
                your existing password may still be required to sign in. If you
                forgot your password, you can reset it from the login page.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 mb-4">
                Current account information:
              </Text>
              <Text className="text-[14px] text-gray-600 leading-5 mb-1 ml-4">
                • Full Name: {username}
              </Text>
              <Text className="text-[14px] text-gray-600 leading-5 mb-1 ml-4">
                • Email: {email}
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 mb-6">
                Please verify your email address to continue using your account.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 mb-6">
                Don&apos;t worry if the displayed name is not correct — you can
                update your profile information later after signing in.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-6 mb-6">
                Verify your email by clicking the button below.
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-8">
              <Button
                href={verifyUrl}
                className="bg-blue-600 text-white font-semibold py-3.5 px-8 rounded-[8px] text-[16px] no-underline box-border"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-8">
              <Text className="text-[14px] text-gray-600 leading-5 text-center">
                If the button doesn&apos;t work, copy and paste this link into
                your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-5 text-center break-all">
                {verifyUrl}
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-amber-50 border border-amber-200 rounded-[8px] p-4 mb-8">
              <Text className="text-[14px] text-amber-800 leading-5 m-0 font-medium">
                🔒 Security Notice: This verification link will expire in 1
                hours. If you didn&apos;t create an account with ApotekKart,
                please ignore this email.
              </Text>
            </Section>

            {/* Support */}
            <Section className="mb-8">
              <Text className="text-[14px] text-gray-600 leading-5 text-center">
                Need help? Contact our pharmacy support team at{" "}
                <Button href="" className="text-blue-600 underline text-[14px]">
                  support@test.com
                </Button>{" "}
                or call 11111111
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-[12px] text-gray-500 leading-4 text-center m-0 mb-2">
                ApotekKart Licensed
              </Text>
              <Text className="text-[12px] text-gray-500 leading-4 text-center m-0 mb-2">
                Jl. mana ya
              </Text>
              <Text className="text-[12px] text-gray-500 leading-4 text-center m-0">
                © 2026 ApotekKart. All rights reserved.{" "}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
