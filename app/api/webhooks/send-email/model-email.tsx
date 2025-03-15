import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SendBudgetEmailProps {
  name?: string;
  previewText?: string;
}

export const SendBudgetEmail = ({
  name = "",
  previewText = "",
}: SendBudgetEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>
            {name} - {previewText}
          </Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Olá, esse é o email teste!
            </Heading>

            <Text className="text-center text-[16px] text-[#666666]">
              Esse é um email de teste.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SendBudgetEmail;
