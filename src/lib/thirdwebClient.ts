import { createThirdwebClient } from "thirdweb";

// It's safe to read NEXT_PUBLIC_ env vars on the client side
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";

export const client = createThirdwebClient({ clientId });
