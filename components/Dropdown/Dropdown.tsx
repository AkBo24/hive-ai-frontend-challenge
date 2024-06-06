'use client';
import React, { ReactNode, useState } from 'react';
import '@/components/Dropdown/styles.css';

type RenderOptionProps<TOption> = {
    option: TOption;
    selectedOptions: Set<TOption>;
    setSetselectedOptions: React.Dispatch<React.SetStateAction<Set<TOption>>>;
};

type DropdownProps<TOption> = {
    placeholder?: string;
    label?: string;
    multiple?: boolean;
    options: TOption[];
    RenderOption?: React.ElementType<RenderOptionProps<TOption>>;
    DropdownIcon?: React.ElementType;
};

const Icon = () => {
    return (
        <svg height='20' width='20' viewBox='0 0 20 20'>
            <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
        </svg>
    );
};

function GetOptionLabel<TOption>({
    option,
    selectedOptions,
    setSetselectedOptions,
}: RenderOptionProps<TOption>) {
    return (
        <p
            key={`option-${option}`}
            onClick={() => {
                let newSet = new Set(selectedOptions);
                if (selectedOptions.has(option)) newSet.delete(option);
                else newSet.add(option);
                setSetselectedOptions(newSet);
            }}
            className={`dropdown-option ${
                selectedOptions.has(option) && 'dropdown-option-selected'
            }`}>
            {option as ReactNode}
        </p>
    );
}

function Dropdown<TOption>({
    label = '',
    placeholder = '',
    multiple = false,
    options,
    RenderOption = GetOptionLabel<TOption>,
    DropdownIcon = Icon,
}: DropdownProps<TOption>) {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOptions, setSetselectedOptions] = useState<Set<TOption>>(new Set());

    const getDisplay = () => {
        if (selectedOptions.size !== 0) {
            return Array.from(selectedOptions).map((option) => (
                <p key={`option-selected-${option}`}>{option as ReactNode},</p>
            ));
        }
        return placeholder;
    };
    return (
        <>
            <label className='dropdown-label-text-s dropdown-label-hushed dropdown-label-spacing'>
                {/* {...getLabelProps()} */}
                {label}
            </label>
            <div className='dropdown-container'>
                <div className='dropdown-input' onClick={() => setOpen(!open)}>
                    <div className='dropdown-selected-value'>{getDisplay()}</div>
                    <div className='dropdown-tools'>
                        <div className='dropdown-tool'>
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
                                selectedOptions={selectedOptions}
                                setSetselectedOptions={setSetselectedOptions}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Dropdown;
