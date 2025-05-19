import { Button } from "@/components/common/button";
import { Icon } from "@iconify/react";

interface PopupCityInfoProps {
  onNext: () => void;
}

const PopupCityInfo = ({ onNext }: PopupCityInfoProps) => {
  return (
    <>
      <div className="space-y-7">
        <div className="border-b border-light-gray pb-7">
          <h2 className="text-lg font-semibold text-orange-500">
            Who Should Attend
          </h2>
          <h2 className="text-lg font-bold text-orange-500 -mt-2 mb-4">
            The Pop-Up City?
          </h2>
          <p className="text-gray-600">
            The Pop-Up City is for anyone based in Enugu or the Southeast who
            wants to explore Ethereum, Web3, and the future of the internet.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            You should join if you are:
          </h3>
          <ul className="list-disc ml-5 list-inside text-base text-dark space-y-1">
            <li>A student or young professional curious about Web3</li>
            <li>A local builder who wants a place to work and collaborate</li>
            <li>
              Someone looking to meet new people and be part of a tech-forward
              community
            </li>
            <li>
              Interested in learning, attending workshops, or contributing to
              open projects
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            What You Get
          </h3>
          <ul className="list-disc ml-5 list-inside text-base text-dark space-y-1">
            <li>Free daily access to a coworking space (Aug 4–8)</li>
            <li>A chance to meet and collaborate with Builder Residents</li>
            <li>Access to community activities, hangouts, and peer learning</li>
            <li>Possible lunch on select days</li>
            <li>Early access or discounts to the ETH Enugu Conference</li>
            <li>A chance to grow your local network and get noticed</li>
          </ul>
        </div>

        <Button
          className="bg-green-550 text-white rounded-full"
          onClick={onNext}
        >
          <span className="flex items-center gap-2">
            Register Here
            <Icon icon="solar:arrow-right-linear" width={16} height={16} />
          </span>
        </Button>
      </div>
    </>
  );
};

export default PopupCityInfo;
