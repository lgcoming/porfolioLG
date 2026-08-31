import "server-only";

import { Resend } from "resend";

let client: Resend | undefined;

export function getResend(apiKey: string) {
  client ??= new Resend(apiKey);
  return client;
}
