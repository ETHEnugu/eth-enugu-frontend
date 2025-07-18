import { client } from "@/lib/thirdwebClient"
import { getContract } from "thirdweb"
import { assetChainTestnet } from "thirdweb/chains"
import { EthEnuguResidencyABI } from "./ContractABI/EthEnuguResidencyABI"

// Your contract ABI (corrected to include 'outputs: []' for all relevant types)

export const ThirdWebContract = getContract({
  client,
  chain: assetChainTestnet,
  address: "0x1807F7c4984f5188e948C2e828fadE1b2F0011eb",
  abi: EthEnuguResidencyABI, // Pass the corrected ABI here
})
