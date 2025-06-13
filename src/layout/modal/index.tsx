"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { Icon } from "@iconify/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | ReactNode;
  description?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            role="presentation"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-3xl min-h-[200px] max-h-[95vh] bg-white rounded-xl shadow-xl z-50 flex flex-col"
            role="document"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-6 border-b flex-shrink-0">
              {title && (
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <Icon
                  icon="heroicons:x-mark"
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </button>
            </header>

            {/* Content */}
            <main className="p-6 w-full overflow-y-auto flex-grow">
              {description && (
                <p id="modal-description" className="sr-only">
                  {description}
                </p>
              )}
              {children}
            </main>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
