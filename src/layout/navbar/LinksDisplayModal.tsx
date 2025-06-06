import Link from "next/link";
import Modal from "../modal";
import { modal_links } from "./_data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/common/button";
import Image from "next/image";

export default function LinksDisplayModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
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

            <Link href={item?.link}>
              <Button
                variant="plain"
                design="rounded"
                className="gap-3"
                onClick={onClose}
              >
                Click to apply
                <Icon icon="mdi:arrow-right" />
              </Button>
            </Link>
          </div>
        ))}
      </section>
    </Modal>
  );
}
