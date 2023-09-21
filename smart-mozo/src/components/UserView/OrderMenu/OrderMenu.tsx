import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Menu, Grid, Typography, MenuItem } from "@mui/material"
import { FC } from "react";

interface OrderMenuProps {
    anchorEl: null | HTMLElement;
    orderList: MenuItem[];
    handleMenuClose: () => void;
    handleDelete: (index: number) => void;
}


const OrderMenu: FC<OrderMenuProps>= ({anchorEl, orderList, handleMenuClose, handleDelete}) => {

    const total: number = orderList.reduce((acc, item) => acc + item.price, 0);


    return(
        <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
        {orderList.map((item, index) => (
            <Grid container justifyContent="space-between" alignItems="center" key={index}>
                <MenuItem>
                    <Typography>{item.plate}</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography>${item.price}</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography>x1</Typography>
                </MenuItem>
                <MenuItem onClick={() => {handleDelete(index)}}>
                    <CloseSharpIcon/>
                </MenuItem>
            </Grid>
        ))}
        <Grid container justifyContent="space-between" alignItems="center">
        <MenuItem>
            <Typography>{`Total:  $${total}`}</Typography>
        </MenuItem>
        </Grid>
        </Menu>
        
    )
}

export default OrderMenu;