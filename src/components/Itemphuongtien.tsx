import React, { useState } from "react";
import "../static/css/itemphuongtien.scss";

interface ItemphuongtienProps {
  name: string;
  img: string;
}

const Itemphuongtien: React.FC<ItemphuongtienProps> = ({ name, img }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="itemphuongtien"
        onClick={() => setIsOpen(true)}
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="overlay-title">{name}</div>
      </div>

      {isOpen && (
        <div className="image-modal" onClick={() => setIsOpen(false)}>
          <div className="image-modal-content">
            <img src={img} alt={name} />
          </div>
        </div>
      )}
    </>
  );
};

export default Itemphuongtien;
