import { Icon } from "@iconify/react/dist/iconify.js";
import { navbar_items } from "./_data";
import Link from "next/link";
import { Button } from "@/components/common/button";
import { useRouter } from "next/navigation";
import { hero_socials } from "@/components/ui/_data";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav({
  isOpen,
  setIsOpen,
  onClick,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClick: () => void;
}) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.menu
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-0 right-0 w-full h-screen bg-white z-50 flex flex-col gap-10 p-6"
        >
          <motion.button
            type="button"
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="self-end cursor-pointer"
          >
            <Icon icon="ic:twotone-close" width={32} height={32} />
          </motion.button>

          <motion.section
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {navbar_items
              .filter((item) => item.title !== "Event")
              .map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="w-full border-b border-black/40"
                >
                  <Link
                    href={item.link}
                    className="block py-4 text-lg font-medium hover:text-green-550 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item?.title}
                  </Link>
                </motion.div>
              ))}
          </motion.section>

          <motion.section
            className="w-max flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                variant="plain"
                design="rounded"
                onClick={onClick}
              >
                Register for event
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="speaker-application">
                <Button
                  type="button"
                  variant="default"
                  design="rounded"
                  className="flex items-center gap-3"
                  onClick={() => {
                    router.push("/speaker-application");
                    setIsOpen(false);
                  }}
                >
                  Apply to Speak
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Icon
                      icon="solar:arrow-right-linear"
                      width={18}
                      height={18}
                    />
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </motion.section>

          <motion.section
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-medium mb-4">Our social links</h3>
            <motion.span className="flex items-center gap-3">
              {hero_socials.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={item.link}
                    className="w-12 h-12 bg-white border border-black rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Icon icon={item.icon} width={32} height={32} />
                  </Link>
                </motion.div>
              ))}
            </motion.span>
          </motion.section>
        </motion.menu>
      )}
    </AnimatePresence>
  );
}
