import React from "react";

const Header = () => {
  return (
    <StyledHeader>
      {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: this.toggle,
      })}
      <AppName>Leave Manager</AppName>
      <LogoutDiv>
        <Button type="primary" danger onClick={() => this.onLogoutClick()}>
          Logout
        </Button>
      </LogoutDiv>
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  padding: 0;
  padding-right: 1em;
  display: flex;
  background: #fff;
  justify-content: space-between;
`;

const AppName = styled.div`
  font-size: 2em;
  font-family: auto;
`;

const LogoutDiv = styled.div`
  justify-content: space-between;
  align: right;
`;

export default Header;
