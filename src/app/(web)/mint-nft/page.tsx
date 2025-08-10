import Banner2 from "@/components/ui/Banner2";
import ScrollingText from "@/components/ui/Scrolling-text";
import NFTPreviewCard from "@/components/ui/mint-nft/NFTPreviewCard";
import { nftData } from "@/components/ui/mint-nft/data";
import MintNftHero from "@/components/ui/mint-nft/MintNftHero";

export default function Page() {
  return (
    <>






      <MintNftHero />

      <div className=" w-full   flex items-center justify-center bg-[#F9F4E8] rounded-t-[40px] h-fit py-18 px-[6%]" >
        <div className=" w-full max-w-6xl   grid grid-cols-1 md:grid-cols-2  justify-items-center place-items-center  gap-10 gap-y-20 " >

          {nftData.map((card, index) => (
            <NFTPreviewCard key={index} card={card} />
          ))}


        </div>
      </div>
      <ScrollingText background="#F9F4E8" />
      <Banner2
        title={
          <>
            Join us in making a difference. <br /> Volunteer with us today!
          </>
        }
        content=""
      />



    </>
  );
}
