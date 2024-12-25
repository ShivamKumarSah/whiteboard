import React from 'react';

interface Mark {
  value: number;
  label: string;
}

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  marks?: Mark[];
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  defaultValue,
  marks = [],
  onChange,
}) => {
  const [value, setValue] = React.useState(defaultValue || min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      {marks.length > 0 && (
        <div className="flex justify-between px-2">
          {marks.map((mark) => (
            <span
              key={mark.value}
              className={`text-xs ${
                value === mark.value
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {mark.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};