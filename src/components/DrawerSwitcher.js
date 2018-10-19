import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Drawer from 'react-native-drawer';

const DrawerSwitcher = ({ component, isOpen, side, children, onClose }) => (
    <Drawer
        type={'displace'}
        content={component}
        closedDrawerOffset={-3}
        tapToClose={true}
        side={side}
        open={isOpen}
        openDrawerOffset={0.2}
        onCloseStart={onClose}
        styles={{ backgroundColor: 'transparent', flex: 1 }}
        tweenHandler={(ratio) => ({
            main: { opacity: (2 - ratio) / 2 }
        })}
    >
        {children}
    </Drawer>
);

export default DrawerSwitcher;