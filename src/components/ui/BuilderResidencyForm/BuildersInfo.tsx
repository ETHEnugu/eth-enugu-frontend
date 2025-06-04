import { Button } from "@/components/common/button";
import { Icon } from "@iconify/react";

interface BuildersResidencyProps {
  onNext: () => void;
}

const BuildersInfo = ({ onNext }: BuildersResidencyProps) => {
  return (
    <>
      <div className="space-y-7">
        <div className="border-b border-light-gray pb-4">
          <h2 className="text-lg font-semibold text-green-550">
            Who Should Apply
          </h2>
          <h2 className="text-lg font-bold text-green-550 -mt-2 mb-4">
            For Builders Residency?
          </h2>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            We’re looking for:
          </h3>
          <ul className="list-disc ml-5 list-inside text-base text-dark space-y-1">
            <li>Builders already working on a project or idea</li>
            <li>Hackers looking to collaborate and explore new problems</li>
            <li>Designers, founders, or researchers in Web3</li>
            <li>
              People excited to contribute to the Enugu tech and Ethereum
              ecosystem
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            What You Get as a Resident
          </h3>
          <ul className="list-disc ml-5 list-inside text-base text-dark space-y-1">
            <li>Shared accommodation (August 4–16)</li>
            <li>Daily access to coworking space</li>
            <li>Community of builders to collaborate with</li>
            <li>Mentorship, idea feedback & mini workshops</li>
            <li>
              Opportunities to connect with local talent through the Pop-Up City
            </li>
            <li>Meals (select days), swag, and more</li>
            <li>Spotlight at the ETH Enugu Summit</li>
          </ul>
        </div>

        <Button
          className="bg-orange-500 text-dark rounded-full"
          onClick={onNext}
        >
          <span className="flex items-center gap-2">
            Yes, I’m eligible
            <Icon icon="solar:arrow-right-linear" width={16} height={16} />
          </span>
        </Button>
      </div>
    </>
  );
};

export default BuildersInfo;
