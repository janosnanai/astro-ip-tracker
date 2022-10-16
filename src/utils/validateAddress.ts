export enum AddressTypes {
  IPV4 = "IPV4",
  IPV6 = "IPV6",
  DOMAIN = "DOMAIN",
}

export interface AddressValidationResult {
  isValid: boolean;
  type?: keyof typeof AddressTypes;
}

export const addressMatchers = {
  ipv4: {
    regex:
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})){3}$/,
    type: AddressTypes.IPV4,
  },
  ipv6: {
    regex: /^(([0-9a-f]{1,4})?:){2,7}([0-9a-f]{1,4})?$/i,
    type: AddressTypes.IPV6,
  },
  domain: {
    regex: /^(((http|https)\:\/\/)?(?!-)[a-z0-9-]{1,63}(?<!-)\.)+[a-z]{2,6}$/i,
    type: AddressTypes.DOMAIN,
  },
};

function validateAddress(address: string) {
  const result: AddressValidationResult = { isValid: false };
  for (const k in addressMatchers) {
    // @ts-ignore
    const addressMatcher = addressMatchers[k];
    if (!addressMatcher.regex.test(address)) continue;
    result.isValid = true;
    result.type = addressMatcher.type;
  }
  return result;
}

export default validateAddress;
