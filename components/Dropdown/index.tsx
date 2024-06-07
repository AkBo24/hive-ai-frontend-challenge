'use client';
import React, { useState } from 'react';
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
    setSelectedOptions?(options: TOption[] | TOption | undefined): void;
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
    const [selectedOptions, setSelectedOptions] = useState<
        TOption[] | TOption | undefined
    >(controlledSelectedOptions ?? (multiple ? [] : undefined));

    const updateSelection = (options: TOption[] | TOption | undefined) => {
        (controlledSetSelectedOptions ?? setSelectedOptions)(options);
    };

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
                                    updateSelection(
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
                                        updateSelection(multiple ? [] : undefined)
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
                                selectedOptions={
                                    controlledSelectedOptions ?? selectedOptions
                                }
                                setSetselectedOptions={updateSelection}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dropdown;
