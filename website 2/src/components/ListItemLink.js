import React from 'react';
import { Link } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

export function ListItemLink(props) {
  const { icon, primary, to, key } = props;
  
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} href={to} key={key} {...linkProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button key={key} component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
