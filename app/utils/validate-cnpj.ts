export function validateCNPJ(cnpj: string | number): boolean {
  const weights: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const cleanedCNPJ: string = String(cnpj).replace(/[^\d]/g, "");

  // Check if the CNPJ length is 14
  if (cleanedCNPJ.length !== 14) return false;

  // Check if the CNPJ is a sequence of zeros
  if (/^0{14}$/.test(cleanedCNPJ)) return false;

  // Validate the first verification digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanedCNPJ[i]) * weights[i + 1];
  }
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cleanedCNPJ[12]) !== firstDigit) return false;

  // Validate the second verification digit
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanedCNPJ[i]) * weights[i];
  }
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cleanedCNPJ[13]) !== secondDigit) return false;

  return true;
}
