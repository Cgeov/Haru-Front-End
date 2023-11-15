import React, { useState, forwardRef, useImperativeHandle } from "react";
import loader from "../../assets/img/logo.png";
import style from "./loader.module.css"
import Image from "next/image";

// eslint-disable-next-line react/display-name
const Loader = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const showLoader = () => {
    setShow(true);
  };

  const hideLoader = () => {
    setShow(false);
  };

  useImperativeHandle(ref, () => ({
    showLoader,
    hideLoader
  }));

  return show ? (
    <div className={style.loaderContainer}>
      <div className={style.backdrop}></div>
      <div className={style.loaderContent}>
        <Image src={loader} width={100} height={100} className={style.appLogo} alt="loader" />
      </div>
    </div>
  ) : null;
});

export default Loader;