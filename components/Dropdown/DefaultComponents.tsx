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
