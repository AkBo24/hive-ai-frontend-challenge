'use client';
import React, { ReactNode, useEffect, useState } from 'react';
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
    open?: boolean;
    setOpen?(): void;
    selectedOptions?: TOption[] | TOption;
    setSelectedOptions?(optoins: TOption[] | TOption): void;
    renderOption?: (item: TOption) => React.ReactNode;
    ClearIcon?: React.ElementType;
    DropdownIcon?: React.ElementType;
};

function Dropdown<TOption>({
    label = '',
    placeholder = '',
    multiple = false,
    options,
    open: controlledOpen,
    setOpen: controlledSetOpen,
    selectedOptions: controlledSelectedOptions,
    setSelectedOptions: controlledSetSelectedOptions,
    renderOption = (option: TOption) => `${option}`,
    ClearIcon = CloseIcon,
    DropdownIcon = DropdownIconComponent,
}: DropdownProps<TOption>) {
    const [open, setOpen] = useState<boolean>(controlledOpen ?? false);
    const [selectedOptions, setSetSelectedOptions] = useState<
        TOption[] | TOption | undefined
    >(multiple ? [] : undefined);

    const getDisplay = () => {
        if (multiple && (selectedOptions as TOption[]).length !== 0) {
            const options = selectedOptions as TOption[];
            return (
                <div className='dropdown-chips'>
                    {options.map((option) => (
                        <div
                            key={`option-selected-${renderOption(option)}`}
                            className='dropdown-chip'>
                            {renderOption(option)}
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSetSelectedOptions(
                                        options.filter(
                                            (other) =>
                                                renderOption(other) !==
                                                renderOption(option)
                                        )
                                    );
                                    // const newSet = new Set(selectedOptions);
                                    // newSet.delete(option);
                                    // setSetSelectedOptions(
                                    //     selectedOptions.filter(
                                    //         (other) =>
                                    //             renderOption(other) !==
                                    //             renderOption(option)
                                    //     )
                                    // );
                                }}
                                className='dropdown-chip-close'>
                                <CloseIcon />
                            </span>
                        </div>
                    ))}
                </div>
            );
        } else if (!multiple && selectedOptions) {
            return renderOption(selectedOptions as TOption);
        }
        return placeholder;
    };
    return (
        <div>
            <label className='dropdown-label-text-s dropdown-label-hushed dropdown-label-spacing'>
                {label}
            </label>
            <div className='dropdown-container'>
                <div
                    className='dropdown-input'
                    onClick={() => {
                        if (controlledSetOpen) {
                            controlledSetOpen();
                        } else {
                            setOpen(!open);
                        }
                    }}>
                    <div className='dropdown-selected-value'>{getDisplay()}</div>
                    <div className='dropdown-tools'>
                        <div className='dropdown-tool'>
                            {ClearIcon ? (
                                <span
                                    onClick={() =>
                                        setSetSelectedOptions(multiple ? [] : undefined)
                                    }>
                                    <ClearIcon />
                                </span>
                            ) : null}

                            <DropdownIcon />
                        </div>
                    </div>
                </div>

                {(controlledOpen ?? open) && (
                    <div className={`dropdown-menu`}>
                        {options.map((option, i) => (
                            <GetOptionLabel
                                key={`option-${i}`}
                                option={option}
                                label={renderOption(option)}
                                multiple={multiple}
                                selectedOptions={selectedOptions}
                                setSetselectedOptions={setSetSelectedOptions}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dropdown;
