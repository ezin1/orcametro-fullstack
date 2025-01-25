import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import {
  InputLabelInBorder,
  InputLabelInBorderProps,
} from "./ui/input-label-in-border";

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputLabelInBorderProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={InputLabelInBorder}
        getInputRef={ref}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
