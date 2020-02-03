import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {Translate, translate} from 'react-jhipster';
import {NavDropdown} from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/address">
      <Translate contentKey="global.menu.entities.address"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-settings">
      <Translate contentKey="global.menu.entities.userSettings"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/borrow">
      <Translate contentKey="global.menu.entities.kacetalLibraryBorrowBorrow"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/book">
      <Translate contentKey="global.menu.entities.kacetalLibraryBookBook"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/author">
      <Translate contentKey="global.menu.entities.kacetalLibraryBookAuthor"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/publisher">
      <Translate contentKey="global.menu.entities.kacetalLibraryBookPublisher"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/stock">
      <Translate contentKey="global.menu.entities.kacetalLibraryStockStock"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/notification">
      <Translate contentKey="global.menu.entities.kacetalLibraryNotificationNotification"/>
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
