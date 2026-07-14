import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <strong>Clothes Store</strong>
        <p>A project for Gustavo's portfolio.</p>
      </div>

      <span>&copy; {new Date().getFullYear()} Gustavo Pinto. All rights reserved.</span>
    </footer>
  );
}

export default Footer;
