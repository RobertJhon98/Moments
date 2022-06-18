import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from '@mui/icons-material/Logout';
import { withRouter } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      user : null
    };
  }

  async componentDidMount(){
    const token = localStorage.getItem('token')
    if(!token) this.props.history.push('/signin')

    const  res = await axios.get('/user')
    this.setState({user : res.data.user})
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleSignOut = () => {
    localStorage.removeItem('token')
    this.props.history.push("/signin")
  }

  drawer = () => (
    <div>
      <Typography component='h1' variant='h4' style={{ marginTop: 16, marginBottom: 5 }}>
        MOMENTS
      </Typography>
      <Divider />
      <List>
        <ListItem selected={window.location.pathname === '/moments'} key={"moments_list"} disablePadding onClick={() => this.props.history.push("/moments")}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Moments List"} />
          </ListItemButton>
        </ListItem>
        <ListItem selected={window.location.pathname === '/new_moment'} key={"new_moment"} disablePadding onClick={() => this.props.history.push("/new_moment")}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardCustomizeIcon />
            </ListItemIcon>
            <ListItemText primary={"Add New Moments"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"sign_out"} disablePadding onClick={() => this.handleSignOut()}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  container = this.props.window !== undefined ? () => window().document.body : undefined;

  render() {
    const { mobileOpen, user } = this.state;
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
          <Drawer
            container={this.container}
            variant='temporary'
            open={mobileOpen}
            onClose={() => this.handleDrawerToggle()}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {this.drawer()}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            {this.drawer()}
          </Drawer>
        </Box>
        <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <AppBar
            position='fixed'
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
            style={{zIndex : 1000}}
          >
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={this.handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' noWrap component='div'>
               {user && user.name ? `Hello ${user.name}` : ''}
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
        </Box>
      </Box>
    );
  }
}
export default withRouter(ResponsiveDrawer);
