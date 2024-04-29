interface TransparentInputProps {
    classNames?: string;
    type: string;
    placeholder: string;
    value: any;
    max?: number;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    onKeyDown?: any;
    limit?: number;
  }
  
  const TransparentInput = ({
    classNames,
    type,
    placeholder,
    value,
    max,
    setValue,
    onKeyDown,
    limit,
  }: TransparentInputProps) => {
    return (
      <input
        className={`w-full text-front bg-transparent focus:outline-none ${classNames}`}
        placeholder={placeholder}
        type={type}
        min={0}
        max={max}
        value={value}
        onChange={(e) => {
          if( limit && e.target.value.length > limit){
            return;
          }
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        multiple
      />
    );
  };
  
  export default TransparentInput;
  