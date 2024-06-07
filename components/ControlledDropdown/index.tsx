'use client';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import { Movies, movies } from '@/assets/movies';

const ControlledDropdown = () => {
    const [singleOpen, setSingleOpen] = useState<boolean>(true);
    const [singleMovie, setSingleMovie] = useState<Movies | undefined>(movies[1]);
    return (
        <>
            {singleMovie ? singleMovie.label : 'undefined'}
            <Dropdown<Movies>
                label='Color (Controlled & Single Select)'
                placeholder='Select...'
                options={movies}
                renderOption={({ label, year }) => `${label} (${year})`}
                open={singleOpen}
                selectedOptions={singleMovie}
                setSelectedOptions={(option: Movies | undefined) => {
                    setSingleMovie(option);
                }}
                setOpen={() => setSingleOpen(!singleOpen)}
            />
            {/* <Dropdown<Movies>
                label='Color (Controlled & Multi Select)'
                placeholder='Select...'
                options={movies}
                multiple
                renderOption={({ label, year }) => `${label} (${year})`}
                open={openDropdown}
                setOpen={() => setOpenDropdown(!openDropdown)}
            /> */}
        </>
    );
};

export default ControlledDropdown;
