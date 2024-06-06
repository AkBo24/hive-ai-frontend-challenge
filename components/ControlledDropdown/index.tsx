'use client';
import React from 'react';
import Dropdown from '@/components/Dropdown';
import { Movies, movies } from '@/assets/movies';

const ControlledDropdown = () => {
    return (
        <Dropdown<Movies>
            label='Color (Uncontrolled & Multi Select)'
            placeholder='Select...'
            options={movies}
            multiple
            renderOption={({ label, year }) => `${label} (${year})`}
        />
    );
};

export default ControlledDropdown;
