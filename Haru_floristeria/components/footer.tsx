import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type FooterType = {
  /** Style props */
  divqodefPageFooterTopAreaPosition?: CSSProperties["position"];
  divqodefPageFooterTopAreaTop?: CSSProperties["top"];
  divqodefPageFooterTopAreaLeft?: CSSProperties["left"];
  divqodefPageFooterTopAreaAlignSelf?: CSSProperties["alignSelf"];
};

const Footer: NextPage<FooterType> = ({
  divqodefPageFooterTopAreaPosition,
  divqodefPageFooterTopAreaTop,
  divqodefPageFooterTopAreaLeft,
  divqodefPageFooterTopAreaAlignSelf,
}) => {
  const divqodefPageFooterTopAreaStyle: CSSProperties = useMemo(() => {
    return {
      position: divqodefPageFooterTopAreaPosition,
      top: divqodefPageFooterTopAreaTop,
      left: divqodefPageFooterTopAreaLeft,
      alignSelf: divqodefPageFooterTopAreaAlignSelf,
    };
  }, [
    divqodefPageFooterTopAreaPosition,
    divqodefPageFooterTopAreaTop,
    divqodefPageFooterTopAreaLeft,
    divqodefPageFooterTopAreaAlignSelf,
  ]);

  return (
    <footer
      className="w-[1440px] flex flex-col items-center justify-center text-center text-base text-palevioletred font-poppins"
      style={divqodefPageFooterTopAreaStyle}
    >
      <div className="relative w-[1440px] h-[109px]">
        <div className="absolute top-[29px] left-[calc(50%_-_340px)] box-border w-[681px] h-[3px] border-b-[1px] border-solid border-palevioletred" />
        <div className="absolute top-[63px] left-[calc(50%_-_299px)] flex flex-row items-start justify-start py-0 px-60 gap-[40px]">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base tracking-[-0.36px] leading-[16px] font-poppins text-palevioletred text-center flex items-center justify-center w-[9.8px] h-4 shrink-0">
            
          </button>
          <div className="relative tracking-[-0.36px] leading-[16px] flex items-center justify-center w-[13.8px] h-4 shrink-0">
            
          </div>
          <div className="relative tracking-[-0.36px] leading-[16px] flex items-center justify-center w-[15.8px] h-4 shrink-0">
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
