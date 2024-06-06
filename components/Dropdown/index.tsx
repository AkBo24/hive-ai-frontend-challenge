'use client';
import React, { ReactNode, useState } from 'react';
import '@/components/Dropdown/styles.css';

type RenderOptionProps<TOption extends ReactNode> = {
    option: TOption;
    selectedOptions: Set<TOption>;
    multiple: boolean;
    setSetselectedOptions: React.Dispatch<React.SetStateAction<Set<TOption>>>;
};

type DropdownProps<TOption extends ReactNode> = {
    placeholder?: string;
    label?: string;
    multiple?: boolean;
    options: TOption[];
    RenderOption?: React.ElementType<RenderOptionProps<TOption>>;
    ClearIcon?: React.ElementType;
    DropdownIcon?: React.ElementType;
};

const Icon = () => {
    return (
        <svg height='20' width='20' viewBox='0 0 20 20'>
            <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
        </svg>
    );
};

const CloseIcon = () => {
    return (
        <svg height='20' width='20' viewBox='0 0 20 20'>
            <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
        </svg>
    );
};

function GetOptionLabel<TOption extends ReactNode>({
    option,
    multiple,
    selectedOptions,
    setSetselectedOptions,
}: RenderOptionProps<TOption>) {
    return (
        <p
            key={`option-${option}`}
            onClick={() => {
                if (multiple) {
                    let newSet = new Set(selectedOptions);
                    if (selectedOptions.has(option)) newSet.delete(option);
                    else newSet.add(option);
                    setSetselectedOptions(newSet);
                } else {
                    setSetselectedOptions(new Set([option]));
                }
            }}
            className={`dropdown-option ${
                selectedOptions.has(option) && 'dropdown-option-selected'
            }`}>
            {option}
        </p>
    );
}

function Dropdown<TOption extends ReactNode>({
    label = '',
    placeholder = '',
    multiple = false,
    options,
    RenderOption = GetOptionLabel<TOption>,
    ClearIcon = CloseIcon,
    DropdownIcon = Icon,
}: DropdownProps<TOption>) {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOptions, setSetselectedOptions] = useState<Set<TOption>>(new Set());

    const getDisplay = () => {
        if (selectedOptions.size !== 0 && multiple) {
            return (
                <div className='dropdown-chips'>
                    {Array.from(selectedOptions).map((option) => (
                        <div key={`option-selected-${option}`} className='dropdown-chip'>
                            {option}
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const newSet = new Set(selectedOptions);
                                    newSet.delete(option);
                                    setSetselectedOptions(newSet);
                                }}
                                className='dropdown-chip-close'>
                                <CloseIcon />
                            </span>
                        </div>
                    ))}
                </div>
            );
        } else if (selectedOptions.size !== 0 && !multiple) {
            return Array.from(selectedOptions)[0];
        }
        return placeholder;
    };
    return (
        <div>
            <label className='dropdown-label-text-s dropdown-label-hushed dropdown-label-spacing'>
                {/* {...getLabelProps()} */}
                {label}
            </label>
            <div className='dropdown-container'>
                <div className='dropdown-input' onClick={() => setOpen(!open)}>
                    <div className='dropdown-selected-value'>{getDisplay()}</div>
                    <div className='dropdown-tools'>
                        <div className='dropdown-tool'>
                            {ClearIcon ? (
                                <span onClick={() => setSetselectedOptions(new Set())}>
                                    <ClearIcon />
                                </span>
                            ) : null}

                            <DropdownIcon />
                        </div>
                    </div>
                </div>

                {open && (
                    <div className={`dropdown-menu`}>
                        {options.map((option, i) => (
                            <RenderOption
                                key={`option-${i}`}
                                option={option}
                                multiple={multiple}
                                selectedOptions={selectedOptions}
                                setSetselectedOptions={setSetselectedOptions}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dropdown;
