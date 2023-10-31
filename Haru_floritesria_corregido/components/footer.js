import { useMemo } from "react";

const Footer = ({
  footerWidth,
  footerAlignSelf,
  instagramIconHeight,
  instagramIconBottom,
}) => {
  const footerStyle = useMemo(() => {
    return {
      width: footerWidth,
      alignSelf: footerAlignSelf,
    };
  }, [footerWidth, footerAlignSelf]);

  const instagramIconStyle = useMemo(() => {
    return {
      height: instagramIconHeight,
      bottom: instagramIconBottom,
    };
  }, [instagramIconHeight, instagramIconBottom]);

  return (
    <footer
      className="w-[1440px] flex flex-col items-center justify-center"
      style={footerStyle}
    >
      <div className="relative w-[1440px] h-[109px]">
        <div className="absolute top-[29px] left-[calc(50%_-_340px)] box-border w-[681px] h-[3px] border-b-[1px] border-solid border-palevioletred" />
        <div className="absolute top-[70px] left-[calc(50%_-_316.2px)] flex flex-row items-start justify-start py-0 px-60 gap-[40px]">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-6 h-6">
            <img
              className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-8xs max-w-full overflow-hidden max-h-full"
              alt=""
              src="/bg3.svg"
            />
            <img
              className="absolute h-3/6 w-6/12 top-[25%] right-[25%] bottom-[25%] left-[25%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/facebook1.svg"
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-6 h-6">
            <img
              className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-8xs max-w-full overflow-hidden max-h-full"
              alt=""
              src="/bg4.svg"
            />
            <img
              className="absolute h-[51.67%] w-[51.67%] top-[24.17%] right-[24.17%] bottom-[24.17%] left-[24.17%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/instagram1.svg"
              style={instagramIconStyle}
            />
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-6 h-6">
            <img
              className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-8xs max-w-full overflow-hidden max-h-full"
              alt=""
              src="/bg5.svg"
            />
            <img
              className="absolute h-[40.83%] w-6/12 top-[29.58%] right-[25%] bottom-[29.58%] left-[25%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/twitter1.svg"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
