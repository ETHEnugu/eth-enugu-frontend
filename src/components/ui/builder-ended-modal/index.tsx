import { Button } from "@/components/common/button";
import Modal from "@/layout/modal";
import { useRouter } from "next/navigation";

export default function BuilderEndedModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleRoute = (destination: "popup" | "conference") => {
    switch (destination) {
      case "popup":
        router.push("/popup-city-application");
        break;
      case "conference":
        router.push("/conference-application");
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Builder Residency Application Closed"
    >
      <article>
        <h1>Application closed</h1>
        <p>
          Applications for the builder residency is closed now. You can however
          still register for the pop up city & conference
        </p>

        <section className="space-x-6 mt-8 float-end">
          <Button
            variant="default"
            design="rounded"
            onClick={() => handleRoute("popup")}
          >
            Pop up City
          </Button>
          <Button
            variant="plain"
            design="rounded"
            onClick={() => handleRoute("conference")}
          >
            Conference
          </Button>
        </section>
      </article>
    </Modal>
  );
}
