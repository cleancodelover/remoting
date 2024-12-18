import {Controller} from "react-hook-form";
import NonSsrWrapper from "@/components/shared/non-ssr-wrapper";

interface componentProps {
  name: string;
  label?: string;
  placeholder: string;
  error?: string;
  type: string;
  control: any;
  autoComplete?: string;
  allowDecimal?: boolean;
  length?:number;
  disabled?: boolean;
  Icon?: React.ComponentType;
  rows?: number;
  resize?: boolean;
}

const TextAreaInputComponent = ({
  name,
  placeholder,
  error,
  type,
  control,
  label,
  //size = "md",
  length = 250,
  autoComplete,
  allowDecimal,
  disabled,
  Icon,
  rows = 4,
  resize,
}: componentProps) => {
  const excepNumberSymbolsWithoutDecimal = ["e", "E", "+", "-", "."];

  const excepNumberSymbolsWithDecimal = ["e", "E", "+", "-"];

  const excepNumberSymbols = allowDecimal
    ? excepNumberSymbolsWithDecimal
    : excepNumberSymbolsWithoutDecimal;

  return (
    <NonSsrWrapper>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({field: {onChange, value}}) => (
        <div>
          {label && (
            <label
              htmlFor="input-group-1"
              className={`mb-1 block text-xs font-medium ${
                error ? "text-red-500" : "text-gray-400"
              } `}
            >
              {label}
            </label>
          )}

          <div className="relative text-[#ffffff]">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon />
              </div>
            )}

            <textarea
              className={`h-[146px] placeholder-[#98A2B3] placeholder:text-[14px] placeholder:font-light ${
                error
                  ? "rounded-lg border-0 border-red-500 bg-[#FFFFFF1A] text-sm text-red-500 placeholder-red-500 focus:ring-red-500 focus:border-blue-500 focus:border-[2px] focus:outline-none"
                  : "rounded-lg border-0 border-secondaryDarkGreen bg-[#FFFFFF1A] text-md text-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              } block w-full ${Icon ? "pl-10" : "pl-2.5"} p-2.5 ${
                resize ? "resize" : "resize-none"
              } `}
              value={value}
              maxLength={length}
              onChange={e => onChange(e)}
              placeholder={placeholder}
              name={name}
              id={`${name}-default-input`}
              disabled={disabled}
              autoComplete={autoComplete}
              aria-autocomplete="none"
              onKeyDown={e =>
                excepNumberSymbols.includes(e.key) &&
                type === "number" &&
                e.preventDefault()
              }
              rows={rows}
            />
          </div>

          {error && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Opps!</span> {error}
            </p>
          )}
        </div>
      )}
    />
    </NonSsrWrapper>
  );
};

export default TextAreaInputComponent;
