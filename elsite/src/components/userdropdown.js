import React from "react";
import { MenuItem, DropdownMenu } from "react-bootstrap";

function userdropdown() {
    return (
        <div>
            <DropdownMenu userName="Chris Smith">
                <MenuItem text="Home" location="/home" />
                <MenuItem text="Edit Profile" location="/profile" />
                <MenuItem text="Change Password" location="/change-password" />
                <MenuItem text="Privacy Settings" location="/privacy-settings" />
                <MenuItem text="Delete Account" onClick={this.deleteAccount} />
                <MenuItem text="Logout" onClick={this.logout} />
            </DropdownMenu>
        </div>
    );
}

export default userdropdown;
