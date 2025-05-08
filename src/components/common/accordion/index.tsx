"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  toggleItem: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  toggleItem,
}) => {
  return (
    <div
      className="mb-4 rounded-lg bg-amber-150 overflow-hidden border-[1px] border-[ #1E1E1E]  "
      style={{ boxShadow: "3px 4px 0px 0px #000000" }}
    >
      <button
        type="button"
        onClick={toggleItem}
        className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none cursor-pointer"
      >
        <h3 className="font-sans font-semibold text-base text-dark md:text-xl leading-[100%] ">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            icon="eva:plus-fill"
            className="text-amber-750"
            width={24}
            height={24}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="font-sans px-6 py-4 text-dark/80 text-sm font-normal  ">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((currentOpenItems) => {
      const newOpenItems = new Set(currentOpenItems);

      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(index);
      }

      return newOpenItems;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openItems.has(index)}
          toggleItem={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};
