import { Icon } from "@iconify/react";
import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
  useTransition,
} from "react";

export type DropdownOption = {
  label: string | ReactNode;
  value: string | number | boolean;
  searchText?: string;
  iso?: string;
};

interface BaseDropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
  isTypeable?: boolean;
  debounceDelay?: number;
}

interface SingleSelectDropdownProps extends BaseDropdownProps {
  multiSelect?: false;
  onValueChange: (selected: DropdownOption) => void;
}

interface MultiSelectDropdownProps extends BaseDropdownProps {
  multiSelect: true;
  onValueChange: (selected: DropdownOption[]) => void;
}

type DropdownProps = SingleSelectDropdownProps | MultiSelectDropdownProps;

/**
 * Dropdown component with single or multi-select capabilities
 * Optimized for React 19 and Next.js 15
 */
const Dropdown = ({
  options,
  placeholder = "Select an option",
  multiSelect = false,
  isTypeable = false,
  debounceDelay = 150,
  onValueChange,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    DropdownOption[] | null
  >(multiSelect ? [] : null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<number | null>(null);

  // Filter options based on search term with optimized memoization
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;

    const searchWords = searchTerm.toLowerCase().split(" ");

    return options.filter(({ label, value, searchText }) => {
      const textToSearch =
        searchText?.toLowerCase() ||
        (typeof label === "string" ? label.toLowerCase() : "") ||
        value.toString().toLowerCase();

      return searchWords.every((word) => textToSearch.includes(word));
    });
  }, [options, searchTerm]);

  // Debounced search with cleanup
  const handleSearch = useCallback(
    (value: string) => {
      if (searchTimeout.current !== null) {
        window.clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = window.setTimeout(() => {
        startTransition(() => {
          setSearchTerm(value);
        });
        searchTimeout.current = null;
      }, debounceDelay);
    },
    [debounceDelay]
  );

  // Handle option selection with improved type safety
  const handleOptionClick = useCallback(
    (option: DropdownOption) => {
      if (multiSelect) {
        setSelectedOptions((prevSelected) => {
          const prevSelectedArray = prevSelected || [];
          const isAlreadySelected = prevSelectedArray.some(
            (item) => item.value === option.value
          );

          const newSelection = isAlreadySelected
            ? prevSelectedArray.filter((item) => item.value !== option.value)
            : [...prevSelectedArray, option];

          // Call onValueChange outside state update for better separation of concerns
          (onValueChange as (selected: DropdownOption[]) => void)(newSelection);
          return newSelection;
        });
      } else {
        setSelectedOptions([option]);
        (onValueChange as (selected: DropdownOption) => void)(option);
        setIsOpen(false);
      }

      setSearchTerm("");
    },
    [multiSelect, onValueChange]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Autofocus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isTypeable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isTypeable]);

  // Close dropdown if menu gets pushed out of viewport
  useEffect(() => {
    if (!isOpen || !dropdownMenuRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setIsOpen(false);
      },
      { rootMargin: "0px 0px -10px 0px" }
    );

    observer.observe(dropdownMenuRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  // Display selection or placeholder text
  const displayText = useMemo(() => {
    if (multiSelect) {
      return selectedOptions?.length
        ? selectedOptions.map((opt) => opt.label).join(", ")
        : placeholder;
    }
    return selectedOptions?.[0]?.label || placeholder;
  }, [multiSelect, placeholder, selectedOptions]);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block w-full ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full flex items-center gap-2 placeholder:text-gray-400 text-neutral-800 border border-dark bg-white text-left text-lg px-4 py-3 rounded-xl"
      >
        <span className="truncate">{displayText}</span>
        <Icon
          icon="mdi:chevron-down"
          width={24}
          className={`ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownMenuRef}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-500 bg-white top-full shadow-lg"
          role="listbox"
          aria-multiselectable={multiSelect}
        >
          {isTypeable && (
            <div className="sticky top-0 bg-white z-10">
              <input
                ref={searchInputRef}
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none bg-white"
                placeholder="Type to search..."
                aria-label="Search dropdown options"
              />
            </div>
          )}

          <div className={isPending ? "opacity-60" : ""}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = selectedOptions?.some(
                  (selected) => selected.value === option.value
                );

                return (
                  <div
                    key={option.value.toString()}
                    onClick={() => handleOptionClick(option)}
                    className={`px-4 py-2 cursor-pointer placeholder:text-gray-400 text-neutral-800 hover:bg-gray-200-600 ${
                      isSelected ? "bg-gray-300" : ""
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.label}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-gray-500">
                No matching options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
