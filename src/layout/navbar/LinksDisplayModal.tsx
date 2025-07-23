import Link from "next/link";
import Modal from "../modal";
import { modal_links } from "./_data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/common/button";
import Image from "next/image";
import BuilderEndedModal from "@/components/ui/builder-ended-modal";
import { useState } from "react";

export default function LinksDisplayModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [showBuilderEnded, setShowBuilderEnded] = useState(false);

  // Handler to close the BuilderEndedModal
  const handleBuilderEndedClose = () => {
    setShowBuilderEnded((prev) => !prev);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <div className="flex items-center gap-3">
            <Image
              src="/logo-one.svg"
              width={32}
              height={32}
              alt="ETH Enugu Logo"
            />
            <span>Join ETH Enugu 2025</span>
          </div>
        }
      >
        <section className="w-full flex flex-col gap-4">
          {modal_links.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start gap-2 ${idx !== modal_links.length - 1 ? "border-b border-gray-200 pb-4" : ""}`}
            >
              <h3>{item?.title}</h3>
              <p>{item?.description}</p>
              {item?.link === "/builder-residency-application" ? (
                <Button
                  variant="plain"
                  design="rounded"
                  className="gap-3"
                  onClick={handleBuilderEndedClose}
                  type="button"
                >
                  Click to apply
                  <Icon icon="mdi:arrow-right" />
                </Button>
              ) : (
                <Link href={item?.link} passHref>
                  <Button
                    variant="plain"
                    design="rounded"
                    className="gap-3"
                    onClick={onClose}
                    type="button"
                  >
                    Click to apply
                    <Icon icon="mdi:arrow-right" />
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </section>
      </Modal>
      <BuilderEndedModal
        show={showBuilderEnded}
        onClose={handleBuilderEndedClose}
      />
    </>
  );
}
