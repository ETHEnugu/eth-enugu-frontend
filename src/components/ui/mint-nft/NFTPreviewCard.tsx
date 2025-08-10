import Image from "next/image";
import { Button } from "../../common/button";
import { NFTDataProps } from "@/types";
import Link from "next/link";



interface NFTPreviewCardProps {
    card: NFTDataProps
}

export default function NFTPreviewCard({ card }: NFTPreviewCardProps) {
    return (
        <div className="w-full flex flex-col gap-4 max-w-lg h-full " >
            <h1 className="w-full max-w-md text-[var(--color-dark)] !text-3xl lg:!text-5xl   " >{card.name}</h1>


            <div className={`w-full h-full  rounded-4xl border-[1px] border-[#1E1E1E] flex items-center justify-center py-10 `} style={{ backgroundColor: card.color }} >
                <Image src={card.image} alt="nft" width={500} height={500} className="object-center object-cover " />
            </div>


         <Link href="/NFT-form" className="w-full" > <Button className=" rounded-[98.11px] mt-6 w-full" >Mint NFT </Button></Link>
        </div>
    )
}