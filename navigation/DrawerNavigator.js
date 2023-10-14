import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";

const Drawer = createDrawerNavigator();

componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light" ? true : false });
  }
  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomSidebarMenu {...props} />}
        screenOptions={{
          headerShown: false, 
          drawerActiveTintColor: "#e91e63",
          drawerInactiveTintColor: "grey",
          itemStyle: { marginVertical: 5 }
        }}
      >
        <Drawer.Screen
          name="MyHome"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }




export default DrawerNavigator;
