interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputWithLabel = ({ label, ...props }: InputWithLabelProps) => {
  return (
    <div
      className={`flex ${
        props.type !== "checkbox"
          ? "flex-col"
          : "flex-row-reverse self-start py-1 gap-2 "
      }`}
    >
      <label
        className="font-semibold"
        htmlFor={label.toLowerCase().replace(" ", "_")}
      >
        {label}
      </label>
      <input
        id={label.toLowerCase().replace(" ", "_")}
        type="text"
        placeholder={label}
        name={label.toLowerCase().replace(" ", "_")}
        {...props}
      />
    </div>
  );
};

interface SelectWithLabelProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  label: string;
}

export const SelectWithLabel = ({
  label,
  options,
  ...props
}: SelectWithLabelProps) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="email">
        {label}
      </label>
      <select name={label.toLowerCase().replace(" ", "-")} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
