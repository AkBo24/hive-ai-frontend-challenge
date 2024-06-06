'use client';
import React, { ReactNode, useState } from 'react';
import '@/components/Dropdown/styles.css';
import {
    CloseIcon,
    DropdownIcon as DropdownIconComponent,
    GetOptionLabel,
} from './DefaultComponents';

type DropdownProps<TOption> = {
    placeholder?: string;
    label?: string;
    multiple?: boolean;
    options: TOption[];
    renderOption?: (item: TOption) => React.ReactNode;
    ClearIcon?: React.ElementType;
    DropdownIcon?: React.ElementType;
};

function Dropdown<TOption>({
    label = '',
    placeholder = '',
    multiple = false,
    options,
    renderOption = (option: TOption) => `${option}`,
    ClearIcon = CloseIcon,
    DropdownIcon = DropdownIconComponent,
}: DropdownProps<TOption>) {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOptions, setSetselectedOptions] = useState<Set<TOption>>(new Set());

    const getDisplay = () => {
        if (selectedOptions.size !== 0 && multiple) {
            return (
                <div className='dropdown-chips'>
                    {Array.from(selectedOptions).map((option) => (
                        <div
                            key={`option-selected-${renderOption(option)}`}
                            className='dropdown-chip'>
                            {renderOption(option)}
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
            return renderOption(Array.from(selectedOptions)[0]);
        }
        return placeholder;
    };
    return (
        <div>
            <label className='dropdown-label-text-s dropdown-label-hushed dropdown-label-spacing'>
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
                            <GetOptionLabel
                                key={`option-${i}`}
                                option={option}
                                label={renderOption(option)}
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
