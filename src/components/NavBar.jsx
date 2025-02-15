import styles from "./NavBar.module.css";
import RegisterBtn from "./RegisterBtn";

const NavBar = ({ contract }) => {
  return (
    <nav>
      <div className={styles.navbar}>
        <div className={styles.usinfocontainer}>
          <a href="/" className={styles.logo}>
            DEXT
          </a>
          <div className={styles.usinfo1}>
            <div className={styles.usinfocontent}>About Us</div>
            <div className={styles.usinfocontent}>Our Motto</div>
            <div className={styles.usinfocontent}>Whitepaper</div>
          </div>
          <div className={styles.usinfo2}>
            {contract && <RegisterBtn contract={contract} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
