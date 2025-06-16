import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import DomainIcon from '@mui/icons-material/Domain';
import PollIcon from '@mui/icons-material/Poll';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { User } from "../interfaces/userInterface";
import { useAuth } from "../contexts/AuthContext";
import { t } from "i18next";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: SidebarProps) => {

  const { isAdmin: admin, logout} = useAuth()
  const location = useLocation();
  const {setUser, setToken, setIsAdmin, user } = useAuthStore((state) => state)

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={location.pathname === "/dashboard"}
          >
            <ListItemIcon>
              <HomeFilledIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.home")}/>
          </ListItemButton>
        </ListItem>

        {!user.hasVoted && <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/vote-page"
            selected={location.pathname === "/vote-page"}
          >
            <ListItemIcon>
              <HowToVoteIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.go_to_vote")} />
          </ListItemButton>
        </ListItem>}

        {admin && <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/user-management"
            selected={location.pathname === "/admin/user-management"}
          >
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.user_management")} />
          </ListItemButton>
        </ListItem>}

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/voting-management"
            selected={location.pathname === "/voting-management"}
          >
            <ListItemIcon>
              <PollIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.voting_management")} />
          </ListItemButton>
        </ListItem>
      
      {admin && <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/center-management"
            selected={location.pathname === "/admin/center-management"}
          >
            <ListItemIcon>
              <DomainIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.center_management")} />
          </ListItemButton>
        </ListItem>}

        {admin && <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/register-candidate"
            selected={location.pathname === "/admin/register-candidate"}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.register_candidate")} />
          </ListItemButton>
        </ListItem>}
        {admin && <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/candidate-management"
            selected={location.pathname === "/admin/candidate-management"}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.candidate_management")} />
          </ListItemButton>
        </ListItem>}
        {admin && <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/tables-management"
            selected={location.pathname === "/admin/tables-management"}
          >
            <ListItemIcon>
              <TableRestaurantIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.table_management")} />
          </ListItemButton>
        </ListItem>}

        

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            selected={location.pathname === "/"}
            onClick={()=>{logout(); setUser({} as User); setIsAdmin(false); setToken("");}}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.logout")} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  

  return (
    <>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
