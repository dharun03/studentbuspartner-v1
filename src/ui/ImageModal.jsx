import { useEffect } from "react";

function ImageModal({ isOpen, onClose, imgUrl }) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="relative z-50 rounded-lg bg-white p-8"
          onClick={(e) => e.stopPropagation}
        >
          <button
            className="absolute right-4 top-4 z-50 rounded-full bg-red-500 px-2 py-1 text-sm text-white"
            style={{ transform: "translate(25%, -25%)" }}
            onClick={onClose}
          >
            x
          </button>
          <div style={{ width: "300px", height: "400px" }} className="mt-2">
            <img src={imgUrl} width="300px" height="400px" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageModal;
