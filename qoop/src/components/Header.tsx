import AccessibilityOutlinedIcon from "@mui/icons-material/AccessibilityOutlined";
import "../styles.css/header.css";

function Header() {
  return (
    <>
      <div className="header">
        <div>Music</div>
        <div>
          <ul>
            <li>
              <a href="https://block.xyz./news/">NEWS</a>
            </li>
            <li>
              <a href="https://block.xyz./careers">CAREERS</a>
            </li>
            <li>
              <a href="https://investors.block.xyz/overview/default.aspx">
                INVESTORS
              </a>
            </li>
            <li></li>
            <a>
              <AccessibilityOutlinedIcon></AccessibilityOutlinedIcon>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
