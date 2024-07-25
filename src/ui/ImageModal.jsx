import { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

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
          <button className="absolute right-2 top-2" onClick={onClose}>
            <IoIosCloseCircle size={30} color="#dc2626" />
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
