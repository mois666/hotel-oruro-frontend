
import { useSidebarContext } from "../layout-context";
import { StyledBurgerButton } from "./navbar.styles";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  console.log(collapsed);
  return (
    <div
      className={StyledBurgerButton()}
      //open={collapsed}
      onClick={setCollapsed}
    >
      <div />
    </div>
  );
};
