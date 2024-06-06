import React from 'react';
import Dropdown from '@/components/Dropdown';
import { movies } from '@/assets/movies';

const UncontrolledDropdown = () => {
    return (
        <Dropdown<string>
            label='Movies (Uncontrolled & Multi Select)'
            placeholder='Select...'
            options={movies.map((movie) => movie.label)}
        />
    );
};

export default UncontrolledDropdown;
