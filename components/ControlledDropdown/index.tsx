'use client';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import { Movies, movies } from '@/assets/movies';

const ControlledDropdown = () => {
    const [singleOpen, setSingleOpen] = useState<boolean>(true);
    const [singleMovie, setSingleMovie] = useState<Movies | undefined>(movies[1]);
    const [multipleOpen, setMultipleOpen] = useState<boolean>(true);
    const [multipleMovie, setMultipleMovie] = useState<Movies[]>([movies[1]]);
    return (
        <>
            <div>
                <p>Selected movie: {`${singleMovie?.label}, ${singleMovie?.year}`}</p>
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
            </div>
            <div>
                <p>Selected movie: {`${singleMovie?.label}, ${singleMovie?.year}`}</p>
                <Dropdown<Movies>
                    label='Color (Controlled & Single Select)'
                    placeholder='Select...'
                    options={movies}
                    renderOption={({ label, year }) => `${label} (${year})`}
                    open={multipleOpen}
                    selectedOptions={multipleMovie}
                    setSelectedOptions={(option: Movies[]) => {
                        setMultipleMovie(option);
                    }}
                    setOpen={() => setMultipleOpen(!singleOpen)}
                    multiple
                />
            </div>
        </>
    );
};

export default ControlledDropdown;
