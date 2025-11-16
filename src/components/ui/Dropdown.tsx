"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  className?: string;
}

export default function Dropdown({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  isLoading = false,
  disabled = false,
  onOpen,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  const handleToggle = () => {
    if (disabled) return;

    if (!isOpen && !hasOpened && onOpen) {
      setHasOpened(true);
      onOpen();
    }

    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className="w-full py-2 ltr:text-left rtl:text-right bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ltr:pl-3 ltr:pr-10 rtl:pr-3 rtl:pl-10"
      >
        <span
          className={`block truncate ${
            !selectedOption ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {isLoading ? "Loading..." : displayText}
        </span>
      </button>

      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-2 rtl:pl-2 pointer-events-none">
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              Loading options...
            </div>
          ) : options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No options available
            </div>
          ) : (
            <ul className="py-1">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full ltr:text-left rtl:text-right px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors ${
                      option.value === value
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-900"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

