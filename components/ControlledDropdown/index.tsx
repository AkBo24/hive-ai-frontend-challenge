'use client';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import { Movies, movies } from '@/assets/movies';

const ControlledDropdown = () => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(true);
    return (
        <Dropdown<Movies>
            label='Color (Controlled & Multi Select)'
            placeholder='Select...'
            options={movies}
            multiple
            renderOption={({ label, year }) => `${label} (${year})`}
            open={openDropdown}
            setOpen={() => setOpenDropdown(!openDropdown)}
        />
    );
};

export default ControlledDropdown;
