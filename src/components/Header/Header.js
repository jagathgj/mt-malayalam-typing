import React from "react";
import { HeaderContainer, Header, HeaderName, Theme } from "@carbon/react";

const MTHeader = () => {
  return (
    <>
      <Theme theme="g100">
        <HeaderContainer
          theme="g100"
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="Carbon React Template">
              <HeaderName href="#" prefix="MT - ">
                Malayalam Typing
              </HeaderName>
            </Header>
          )}
        />
      </Theme>
    </>
  );
};

export default MTHeader;
