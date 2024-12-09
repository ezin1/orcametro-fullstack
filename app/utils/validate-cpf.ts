export function validateCPF(cpf: string | number): boolean {
  // Replace all non-digit characters with an empty string
  const strCPF: string = String(cpf).replace(/[^\d]/g, "");

  // Check if the length of the CPF is not 11 characters
  if (strCPF.length !== 11) return false;

  // Check if the CPF is one of the known invalid sequences
  const invalidCPFs: string[] = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];

  if (invalidCPFs.includes(strCPF)) return false;

  // Calculate the first verification digit
  let soma: number = 0;
  let resto: number;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(strCPF.substring(9, 10))) return false;

  // Calculate the second verification digit
  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(strCPF.substring(10, 11))) return false;

  // If all checks pass, the CPF is valid
  return true;
}
