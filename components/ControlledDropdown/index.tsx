import React from 'react';
import Dropdown from '@/components/Dropdown';

const ControlledDropdown = () => {
    return (
        <Dropdown<string>
            label='Color (Uncontrolled & Multi Select)'
            placeholder='Select...'
            options={['red', 'blue', 'red', 'orange']}
            multiple
        />
    );
};

export default ControlledDropdown;
