import React, { useState } from "react";

function CupertinoModal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
      >
        Open Dialog
      </button>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Dialog Box */}
          <div className="w-[360px] bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden">
            {/* Title */}
            <div className="px-4 pt-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Remove from Watchlist?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                This show will be removed from your Watchlist. You can add it back later.
              </p>
            </div>

            {/* Divider */}
            <div className="mt-4 border-t border-gray-200" />

            {/* Buttons */}
            <div className="flex flex-col divide-y divide-gray-200">
              <button
                onClick={() => setOpen(false)}
                className="py-3 text-blue-600 font-medium hover:bg-gray-100"
              >
                Remove
              </button>
              <button
                onClick={() => setOpen(false)}
                className="py-3 text-blue-600 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        
      )}
      </div>
  );
}

export default CupertinoModal;
