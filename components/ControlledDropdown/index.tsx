'use client';
import React, { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import { Movie, movies } from '@/assets/movies';

const ControlledDropdown = () => {
    const [singleOpen, setSingleOpen] = useState<boolean>(false);
    const [singleMovie, setSingleMovie] = useState<Movie | undefined>(undefined);
    const [multipleOpen, setMultipleOpen] = useState<boolean>(true);
    const [multipleMovie, setMultipleMovie] = useState<Movie[]>([movies[1], movies[3]]);
    return (
        <>
            <div>
                <p>
                    Selected movie:{' '}
                    {singleMovie ? `${singleMovie?.label}, ${singleMovie?.year}` : 'none'}
                </p>
                <Dropdown<Movie>
                    label='Color (Controlled & Single Select)'
                    placeholder='Select...'
                    options={movies}
                    renderOption={({ label, year }) => `${label} (${year})`}
                    open={singleOpen}
                    selectedOptions={singleMovie}
                    setSelectedOptions={(option: Movie | undefined) => {
                        setSingleMovie(option);
                    }}
                    setOpen={(open?: boolean) => setSingleOpen(open ?? !singleOpen)}
                    ClearIcon={null}
                />
            </div>
            <>
                <Dropdown<Movie>
                    label='Color (Controlled & Multi Select)'
                    placeholder='Select...'
                    options={movies}
                    renderOption={({ label, year }) => `${label} (${year})`}
                    open={multipleOpen}
                    selectedOptions={multipleMovie}
                    setSelectedOptions={(option: Movie[]) => {
                        setMultipleMovie(option);
                    }}
                    setOpen={(open?: boolean) => setMultipleOpen(open ?? !multipleOpen)}
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
