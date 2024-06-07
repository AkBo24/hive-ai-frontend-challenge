'use client';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import { Movies, movies } from '@/assets/movies';

const ControlledDropdown = () => {
    const [singleOpen, setSingleOpen] = useState<boolean>(false);
    const [singleMovie, setSingleMovie] = useState<Movies | undefined>(movies[1]);
    const [multipleOpen, setMultipleOpen] = useState<boolean>(true);
    const [multipleMovie, setMultipleMovie] = useState<Movies[]>([movies[1], movies[3]]);
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
            <>
                <Dropdown<Movies>
                    label='Color (Controlled & Multi Select)'
                    placeholder='Select...'
                    options={movies}
                    renderOption={({ label, year }) => `${label} (${year})`}
                    open={multipleOpen}
                    selectedOptions={multipleMovie}
                    setSelectedOptions={(option: Movies[]) => {
                        console.log(option);
                        setMultipleMovie(option);
                    }}
                    setOpen={() => setMultipleOpen(!multipleOpen)}
                    multiple
                />

                <div>
                    <p>Selected Movies ({multipleMovie.length}): </p>

                    <ul>
                        {multipleMovie.map((movie, i) => (
                            <li key={i}>{`${movie.label}, ${movie.year}`}</li>
                        ))}
                    </ul>
                </div>
            </>
        </>
    );
};

export default ControlledDropdown;
