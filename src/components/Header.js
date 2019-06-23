import React from 'react';
import NavbarTitle from "./Navbar-Title";
import HeaderBackButton from "./Header-Back-Button";
import HeaderEmptySpace from "./Header-Empty-Space";

const Header = ({ navigation, title, right, left }) => ({
    headerRight: (right) ? right : <HeaderEmptySpace />,
    headerTitle: <NavbarTitle caption={title} />,
    headerLeft: (left) ? left : <HeaderBackButton onPress={() => navigation.pop()} />
});

export default Header;
