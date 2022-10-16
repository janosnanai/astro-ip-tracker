import dns from "dns/promises";

import validateAddress, { AddressTypes } from "../../utils/validateAddress";

const API_KEY: string = import.meta.env.IPGEOLOCATION_API_KEY;
const BASE_URL = "https://api.ipgeolocation.io/ipgeo";

export async function get({ params }: { params: { address: string } }) {
  let resolvedAddresses: string[];
  let { address } = params;

  const validationResult = validateAddress(address);

  if (!validationResult.isValid) {
    return new Response(null, {
      status: 400,
      statusText: "Bad request",
    });
  }

  // if it's url it needs resolving
  if (validationResult.type === AddressTypes.DOMAIN) {
    try {
      resolvedAddresses = await dns.resolve(params.address);
    } catch (err: any) {
      return new Response(err, {
        status: err.code === "ENOTFOUND" ? 404 : 500,
        statusText:
          err.code === "ENOTFOUND" ? "Not found" : "Something went wrong",
      });
    }

    if (!resolvedAddresses || !resolvedAddresses.length) {
      return new Response(null, {
        status: 404,
        statusText: "Not found",
      });
    }

    address = resolvedAddresses[0];
  }

  try {
    return await fetch(`${BASE_URL}?apiKey=${API_KEY}&ip=${address}`);
  } catch (err: any) {
    return new Response(err, {
      status: err.code === "ENOTFOUND" ? 404 : 500,
      statusText:
        err.code === "ENOTFOUND" ? "Not found" : "Something went wrong",
    });
  }
}
