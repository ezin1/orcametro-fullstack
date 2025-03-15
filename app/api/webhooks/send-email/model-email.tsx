import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SendBudgetEmailProps {
  clientName?: string;
  projectName?: string;
  budgetValue?: string;
  budgetId?: string;
  validUntil?: string;
  previewText?: string;
}

export const SendBudgetEmail = ({
  clientName = "Cliente",
  projectName = "Projeto",
  budgetValue = "R$ 0,00",
  budgetId = "ORÇ-0001",
  validUntil = "30 dias",
  previewText = "Seu orçamento está pronto!",
}: SendBudgetEmailProps) => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-50 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[600px] rounded-lg border border-solid border-[#eaeaea] bg-white p-[30px] shadow-sm">
            <Section className="text-center">
              <Img
                src={`${baseUrl}/logo.png`}
                width={187}
                height={49}
                alt="Orçametro"
                className="mx-auto mb-4"
              />
            </Section>

            <Heading className="mx-0 my-[24px] p-0 text-center text-[24px] font-bold text-[hsl(221.2,83.2%,53.3%)]">
              Seu orçamento está pronto!
            </Heading>

            <Text className="text-[16px] leading-[24px] text-gray-700">
              Olá <strong>{clientName}</strong>,
            </Text>

            <Text className="text-[16px] leading-[24px] text-gray-700">
              Temos o prazer de enviar o orçamento solicitado para o projeto{" "}
              <strong>{projectName}</strong>. Abaixo você encontrará os detalhes
              principais:
            </Text>

            <Section className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
              <Text className="m-0 text-[15px] text-gray-700">
                <strong>Número do orçamento:</strong> {budgetId}
              </Text>
              <Text className="m-0 text-[15px] text-gray-700">
                <strong>Valor total:</strong> {budgetValue}
              </Text>
              <Text className="m-0 text-[15px] text-gray-700">
                <strong>Validade:</strong> {validUntil}
              </Text>
            </Section>

            <Text className="text-[16px] leading-[24px] text-gray-700">
              Para visualizar todos os detalhes do orçamento, clique no botão
              abaixo:
            </Text>

            <Section className="mb-8 mt-6 text-center">
              <Button
                className="rounded-md bg-[hsl(221.2,83.2%,53.3%)] px-6 py-3 text-center text-[16px] font-medium text-white no-underline"
                href={`${baseUrl}/orcamentos/${budgetId}`}
              >
                Visualizar Orçamento Completo
              </Button>
            </Section>

            <Hr className="my-6 border border-gray-200" />

            <Text className="text-[14px] leading-[24px] text-gray-600">
              Se você tiver alguma dúvida sobre este orçamento, responda a este
              e-mail ou entre em contato conosco.
            </Text>

            <Text className="text-[14px] leading-[24px] text-gray-600">
              Agradecemos a oportunidade de trabalhar com você!
            </Text>

            <Text className="mt-6 text-center text-[14px] font-medium text-[hsl(221.2,83.2%,53.3%)]">
              Orçametro - Soluções em orçamentos para o seu negócio
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SendBudgetEmail;
