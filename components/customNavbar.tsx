import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import React from 'react';
import Link from 'next/link';

const styles = {
  width: 240,
  display: 'inline-table',
  marginRight: 10
};

const CustomSidenav = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }:any) => {
  return (
    <div style={styles}>
      <Sidenav
        appearance={appearance}
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Sidenav.Body>
          <Nav {...navProps}>
            <Nav.Item eventKey='1' href='/dashboard' icon={<DashboardIcon />} as={Link}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey='2' href='/login' icon={<GroupIcon />} as={Link}>
            login
            </Nav.Item>
            <Nav.Item eventKey='3' href='/patient' icon={<GroupIcon />} as={Link}>
            Patient List
            </Nav.Item>

            <Nav.Item eventKey='4' href='/register' icon={<GroupIcon />} as={Link}>
            Messages
            </Nav.Item>

            <Nav.Item eventKey='5' href='/register' icon={<GroupIcon />} as={Link}>
            Payment information
            </Nav.Item>

            <Nav.Item eventKey='6' href='/register' icon={<GroupIcon />} as={Link}>
            Settings
            </Nav.Item>

            <Nav.Item eventKey='7' href='/login' icon={<GroupIcon />} as={Link}>
            Logout
            </Nav.Item>
            <Nav.Menu eventKey="8" title="Settings" icon={<GearCircleIcon />}>
              <Nav.Item eventKey="8-1">Applications</Nav.Item>
              <Nav.Item eventKey="8-2">Channels</Nav.Item>
              <Nav.Item eventKey="8-3">Versions</Nav.Item>
              <Nav.Menu eventKey="8-5" title="Custom Action">
                <Nav.Item eventKey="8-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="8-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={onExpand} />
      </Sidenav>
    </div>
  );
};
export default CustomSidenav;
