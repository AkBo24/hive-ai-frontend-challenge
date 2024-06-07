import { ReactNode } from 'react';

export const DropdownIcon = () => {
    return (
        <svg height='20' width='20' viewBox='0 0 20 20'>
            <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
        </svg>
    );
};

export const CloseIcon = () => {
    return (
        <svg height='20' width='20' viewBox='0 0 20 20'>
            <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
        </svg>
    );
};

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
