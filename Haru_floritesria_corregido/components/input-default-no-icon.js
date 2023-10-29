import { useMemo } from "react";

const InputDefaultNoIcon = ({
  inputLabel,
  inputDefaultNoIconWidth,
  inputDefaultNoIconPosition,
  inputDefaultNoIconTop,
  inputDefaultNoIconLeft,
  inputDefaultNoIconGap,
  inputDefaultNoIconBorder,
  inputDefaultNoIconFontFamily,
  inputDefaultNoIconFontSize,
  inputDefaultNoIconBackgroundColor,
  inputLabelDisplay,
}) => {
  const inputDefaultNoIconStyle = useMemo(() => {
    return {
      width: inputDefaultNoIconWidth,
      position: inputDefaultNoIconPosition,
      top: inputDefaultNoIconTop,
      left: inputDefaultNoIconLeft,
      gap: inputDefaultNoIconGap,
      border: inputDefaultNoIconBorder,
      fontFamily: inputDefaultNoIconFontFamily,
      fontSize: inputDefaultNoIconFontSize,
      backgroundColor: inputDefaultNoIconBackgroundColor,
    };
  }, [
    inputDefaultNoIconWidth,
    inputDefaultNoIconPosition,
    inputDefaultNoIconTop,
    inputDefaultNoIconLeft,
    inputDefaultNoIconGap,
    inputDefaultNoIconBorder,
    inputDefaultNoIconFontFamily,
    inputDefaultNoIconFontSize,
    inputDefaultNoIconBackgroundColor,
  ]);

  const inputLabelStyle = useMemo(() => {
    return {
      display: inputLabelDisplay,
    };
  }, [inputLabelDisplay]);

  return (
    <div
      className="w-[300px] flex flex-col items-start justify-start gap-[8px] text-left text-xs text-gray font-caption-regular"
      style={inputDefaultNoIconStyle}
    >
      <div
        className="self-stretch relative leading-[20px]"
        style={inputLabelStyle}
      >
        {inputLabel}
      </div>
      <div className="self-stretch rounded bg-pink box-border h-9 flex flex-row items-center justify-start p-2 border-[1px] border-solid border-grey-400">
        <div className="flex-1 relative leading-[20px]">Input placeholder</div>
      </div>
    </div>
  );
};

export default InputDefaultNoIcon;
