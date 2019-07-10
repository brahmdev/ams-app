import React from 'react';
import { Container, Content } from "../../components";
import FeesList from "./FeesList";

const Layout = ({ listProps }) =>
    <Container>
        <Content noPadding>
            <FeesList listProps={listProps} />
        </Content>
    </Container>;

export default Layout;
