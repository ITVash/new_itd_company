import React from "react";

const NotFound: React.FC = (): React.ReactElement => {
  return (
    <>
      <div className="notFound__wrap">
        <img src="/img/itd_404.png" alt="" className="notFoundIMG" />
        <img src="/img/notFound_ipad.png" alt="" className="notFound_ipad" />
        <img src="/img/notFound_mobil.png" alt="" className="notFound_mobil" />
        <img
          src="/img/notFound_iphone.png"
          alt=""
          className="notFound_iphone"
        />
      </div>
    </>
  );
};

export default NotFound;
