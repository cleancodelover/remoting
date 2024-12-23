import {Controller} from "react-hook-form";

interface componentProps {
  name: string;
  label?: string;
  placeholder: string;
  error?: string;
  type: string;
  control: any;
  autoComplete?: string;
  allowDecimal?: boolean;
  required?:boolean,
  disabled?: boolean;
  Icon?: React.ComponentType;
  fileAcceptedFormats?:string,
  defaultValue?: string | number;
  onInputChange?:(e:any)=>void
  setValue?:any
}
const TextInputComponent = ({
  name,
  placeholder,
  error,
  type,
  control,
  label,
  autoComplete,
  allowDecimal,
  disabled,
  Icon,
  defaultValue,
  required=false,
  fileAcceptedFormats = '*/*',
  onInputChange,
  setValue
}: componentProps) => {
  const excepNumberSymbolsWithoutDecimal = ["e", "E", "+", "-", "."];

  const excepNumberSymbolsWithDecimal = ["e", "E", "+", "-"];

  const excepNumberSymbols = allowDecimal
    ? excepNumberSymbolsWithDecimal
    : excepNumberSymbolsWithoutDecimal;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({field: {onChange, value}}) => (
        <div>
          {label && (
            <label
              htmlFor="input-group-1"
              className={`mb-1 block text-xs font-medium ${
                error ? "text-red-500" : "text-gray-400"
              } `}
            >
              {label}{required && <span className="text-sm text-red-400">*</span>}
            </label>
          )}

          <div className="relative text-gray-500">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon />
              </div>
            )}

            <input
              className={`placeholder-[#98A2B3] placeholder:text-[12px] placeholder:font-light ${
                error
                  ? "rounded-lg border-red-500 bg-[#FFFFFF1A] text-sm text-red-500 placeholder-red-500 focus:border-blue-500 focus:border-[2px] focus:outline-none"
                  : "rounded-lg border-secondaryDarkGreen bg-[#FFFFFF1A] text-sm text-gray-50 focus:border-blue-500 focus:border-[2px] focus:outline-none"
              } block w-full h-[44px] ${Icon ? "pl-10" : "pl-2.5"} p-2.5`}
              value={value}
              onChange={(e)=>{
                onChange(e);
                type === 'file' ? (onInputChange && onInputChange(e.target.files)) : (onInputChange && onInputChange(e))
              }}
              placeholder={placeholder}
              type={type}
              name={name}
              id={`${name}-default-input`}
              disabled={disabled}
              autoComplete={autoComplete}
              accept={fileAcceptedFormats}
              aria-autocomplete="none"
              onKeyDown={e =>
                excepNumberSymbols.includes(e.key) &&
                type === "number" &&
                e.preventDefault()
              }
            />
          </div>

          {error && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-500 font-normal">
              <span className="font-medium">Opps!</span> {error}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default TextInputComponent;
