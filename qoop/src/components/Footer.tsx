import "../styles.css/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <h1>BLOCK</h1>
        <div className="footer-links">
          <a
            href="https://squareup.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Square
          </a>
          <a href="https://cash.app" target="_blank" rel="noopener noreferrer">
            Cash App
          </a>
          <a
            href="https://spiral.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spiral
          </a>
          <a href="https://tidal.com" target="_blank" rel="noopener noreferrer">
            Tidal
          </a>
          <a
            href="https://tbd.website"
            target="_blank"
            rel="noopener noreferrer"
          >
            TBD
          </a>
        </div>
      </div>
      <div className="footer-text">
        <p>
          © 2024 Block, Inc. BLOCK and the Block Logo are trademarks of Block,
          Inc.{" "}
          <a
            href="https://legal.block.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-link"
          >
            Legal
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;