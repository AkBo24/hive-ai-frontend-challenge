'use client';
import React, { useEffect, useRef, useState } from 'react';
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
    setOpen?(open?: boolean): void;
    selectedOptions?: TOption[] | TOption;
    setSelectedOptions?(options: TOption[] | TOption | undefined): void;
    renderOption?: (item: TOption) => React.ReactNode;
    ClearIcon?: React.ElementType | null;
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
    >(multiple ? [] : undefined);
    const ref = useRef<HTMLDivElement>(null);

    const updateSelection = (options: TOption[] | TOption | undefined) => {
        (controlledSetSelectedOptions ?? setSelectedOptions)(options);
    };

    useEffect(() => {
        const handler = (e: any) => {
            console.log(ref);

            if (ref.current && !ref.current.contains(e.target)) {
                if (controlledSetOpen) controlledSetOpen(false);
                else setOpen(false);
            }
        };

        window.addEventListener('click', handler);
        return () => {
            window.removeEventListener('click', handler);
        };
    }, [open, controlledOpen, controlledSetOpen]);

    const getDisplay = () => {
        const options = (controlledSelectedOptions ?? selectedOptions) as TOption[];
        if (multiple && (options as TOption[]).length !== 0) {
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
                                }}
                                className='dropdown-chip-close'>
                                <CloseIcon />
                            </span>
                        </div>
                    ))}
                </div>
            );
        } else if (!multiple && options) {
            return renderOption(options as TOption);
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
                    }}
                    ref={ref}>
                    <div className='dropdown-selected-value'>{getDisplay()}</div>
                    <div className='dropdown-tools'>
                        {ClearIcon ? (
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateSelection(multiple ? [] : undefined);
                                }}>
                                <ClearIcon />
                            </span>
                        ) : null}
                        <DropdownIcon />
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
                                renderOption={renderOption}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dropdown;
