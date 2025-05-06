import React, { useState } from "react";
import { SizeModalProps } from "types/type";


const SizeModal: React.FC<SizeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSizes = [],
}) => {
  const [sizes, setSizes] = useState<string[]>(initialSizes);
  const [newSize, setNewSize] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [lastRemovedSize, setLastRemovedSize] = useState<string | null>(null);

  const handleAddSize = () => {
    const normalizedSize = newSize.trim().toUpperCase();
    if (!normalizedSize) {
      setError("Size cannot be empty.");
      return;
    }
    if (!/^[A-Z0-9]+$/.test(normalizedSize)) {
      setError("Invalid size format. Use letters and numbers only.");
      return;
    }
    if (sizes.includes(normalizedSize)) {
      setError("This size is already added.");
      return;
    }
    setSizes((prevSizes) => [...prevSizes, normalizedSize]);
    setNewSize("");
    setError(null);
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    setLastRemovedSize(sizeToRemove);
    setSizes((prevSizes) => prevSizes.filter((size) => size !== sizeToRemove));
  };

  const handleUndo = () => {
    if (lastRemovedSize) {
      setSizes((prevSizes) => [...prevSizes, lastRemovedSize]);
      setLastRemovedSize(null);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px] shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Manage Sizes</h2>
          {sizes.length > 0 && (
            <button
              type="button"
              onClick={() => setSizes([])}
              className="text-red-500 text-sm hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Input Field */}
        <div className="flex justify-between gap-2 relative mb-4">
          <input
            id="sizeInput"
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="Enter size (e.g., M, L, XL)"
            className={`flex-1 border px-4 py-2 rounded-lg ${
              error ? "border-red-500" : ""
            } focus:outline-blue-500`}
            aria-describedby="sizeInputError"
          />
          {error && (
            <p
              id="sizeInputError"
              className="absolute left-0 -bottom-5 text-red-500 text-xs flex items-center gap-1"
            >
              <span>⚠</span> {error}
            </p>
          )}
          {/* Add Button */}
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
        </div>

        {/* Undo Notification */}
        {lastRemovedSize && (
          <div className="text-sm text-gray-600 flex justify-between items-center mb-4">
            <span>Removed {lastRemovedSize}. </span>
            <button
              type="button"
              onClick={handleUndo}
              className="text-blue-500 hover:underline"
            >
              Undo
            </button>
          </div>
        )}

        {/* Size List */}
        <ul className="grid grid-cols-3 gap-2 mb-4">
          {sizes.length > 0 ? (
            sizes.map((size) => (
              <li
                key={size}
                className="fade-in py-1 px-2 bg-gray-100 text-center rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-700">{size}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSize(size)}
                  className="text-red-500 hover:underline text-sm ml-2"
                >
                  ✕
                </button>
              </li>
            ))
          ) : (
            <li className="py-2  text-gray-500 text-sm text-center">
              No sizes added yet.
            </li>
          )}
        </ul>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(sizes)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeModal;
