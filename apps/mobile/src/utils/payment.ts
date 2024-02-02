function formatCardNumber(oldValue: string, newValue: string): string {
  if (oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue
    .replace(/\W/gi, '')
    .replace(/(.{4})/g, '$1 ')
    .substring(0, 19);
}

function formatCardExpiration(oldValue: string, newValue: string): string {
  if (oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue
    .replace(/\W/gi, '')
    .replace(/(.{2})/g, '$1/')
    .substring(0, 5);
}

function formatCardSecurityCode(oldValue: string, newValue: string): string {
  if (oldValue.length > newValue.length) {
    return newValue;
  }

  return newValue.replace(/\W/gi, '').substring(0, 3);
}

function parseCardNumber(value: string): string[] {
  return value.match(/(.{4})/g) as string[];
}

export const formatter = {
  card: {
    number: formatCardNumber,
    expiration: formatCardExpiration,
    securityCode: formatCardSecurityCode,
  },
};

export const parser = {
  card: {
    number: parseCardNumber,
  },
};
