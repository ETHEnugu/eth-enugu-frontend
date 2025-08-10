import Image from "next/image";
import { heroNFTs } from "./data";



export default function MintNftHero() {
    return (
        <div className="h-[70vh] w-full flex flex-col items-center justify-center gap-10 bg-[#FEF3E680]  bg-[url('/NFTs/mint-nft-hero-img.svg')] bg-cover bg-center">


            <div className="flex flex-col items-center justify-center gap-5 text-center" >
                <h1 className="lg:!text-8xl !text-5xl   font-extrabold text-[#090909] " >Featured NFTS</h1>
                <p className=" font-medium text-[var(--color-dark)] !text-sm !lg:text-base " >We are sponsoring all gas fees that has to do with ETH ENUGU 2025</p>
            </div>


            <div className="w-full max-w-6xl flex items-center justify-center relative gap-3 " >

                {heroNFTs.map((card, index) => (
                    <div key={index} >
                        <Image src={card} alt="image" height={500} width={500} />
                    </div>
                ))}

            </div>




        </div>
    )
}