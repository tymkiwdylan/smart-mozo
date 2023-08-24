//React component that is an option for dropdown menu. The option should be a List Item Button from Material UI. And it should have an icon and a string as props.
import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface OptionProps {
    text: string;
    path: string;
}

const Option: React.FC<OptionProps> = ({ text, path }) => {
    return (
        <Grid item xs={12}>
            <Button
                color='secondary'
                component={Link}
                to={path}
                fullWidth
            >
                {text}
            </Button>
        </Grid>
    );
};

export default Option;