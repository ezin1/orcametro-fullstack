export function validateCpf(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpfLimpo.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1+$/.test(cpfLimpo)) return false;

  const calcularDigito = (base: string) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i]) * (base.length + 1 - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  // Calcula os dígitos verificadores
  const digito1 = calcularDigito(cpfLimpo.slice(0, 9));
  const digito2 = calcularDigito(cpfLimpo.slice(0, 9) + digito1);

  // Verifica se os dígitos calculados correspondem aos fornecidos
  return cpfLimpo.endsWith(`${digito1}${digito2}`);
}
