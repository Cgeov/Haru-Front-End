import { useMemo } from "react";

const FormContainer = ({ ctaButtonText, propTop, propLeft }) => {
  const outlineHoverLargeNoIconStyle = useMemo(() => {
    return {
      top: propTop,
      left: propLeft,
    };
  }, [propTop, propLeft]);

  return (
    <button
      className="cursor-pointer [border:none] py-3 px-6 bg-palevioletred absolute top-[555px] left-[165px] rounded-md w-[268px] flex flex-row items-center justify-center box-border"
      style={outlineHoverLargeNoIconStyle}
    >
      <div className="relative text-base leading-[24px] font-semibold font-buttons-large-semibold text-gray text-left">
        {ctaButtonText}
      </div>
    </button>
  );
};

export default FormContainer;
