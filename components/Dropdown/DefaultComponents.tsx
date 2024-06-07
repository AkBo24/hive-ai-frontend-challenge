import { ReactNode } from 'react';

export const DropdownIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'>
            <path d='M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z' />
        </svg>
    );
};

export const CloseIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height='18px'
            viewBox='0 -1060 960 960'
            width='18px'>
            <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
        </svg>
    );
};

export const SearchIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'>
            <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
        </svg>
    );
};

// Default function component for the label

type RenderOptionProps<TOption> = {
    option: TOption;
    label: ReactNode;
    selectedOptions: TOption[] | TOption | undefined;
    multiple: boolean;
    renderOption: (item: TOption) => React.ReactNode;
    setSetselectedOptions(options: TOption[] | TOption | undefined): void;
};

export function GetOptionLabel<TOption>({
    option,
    label,
    multiple,
    selectedOptions,
    setSetselectedOptions,
    renderOption,
}: RenderOptionProps<TOption>) {
    const optionLabel = renderOption(option);

    let isSelected = multiple
        ? (selectedOptions as TOption[]).filter(
              (other) => renderOption(other) === optionLabel
          ).length > 0
        : option === selectedOptions;

    return (
        <p
            key={`option-${option}`}
            onClick={(e) => {
                e.stopPropagation();
                if (multiple) {
                    let newSet = new Set(selectedOptions as Set<TOption>);
                    if (newSet.has(option)) newSet.delete(option);
                    else newSet.add(option);
                    setSetselectedOptions(Array.from(newSet));
                } else {
                    if (selectedOptions && isSelected) setSetselectedOptions(undefined);
                    else setSetselectedOptions(option);
                }
            }}
            className={`dropdown-option ${isSelected && 'dropdown-option-selected'}`}>
            {label}
        </p>
    );
}
