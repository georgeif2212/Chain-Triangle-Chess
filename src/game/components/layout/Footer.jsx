import styles from "@styles/components/layout/Footer.module.css";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Typography variant="body2" align="center" className={styles.text}>
        <span className={styles.highlight}>
          Universidad Autónoma Metropolitana
        </span>{" "}
        © 2025
      </Typography>

      <Box className={styles.section}>
        <Typography variant="body2" align="center" className={styles.text}>
          Responsables del sitio:{" "}
          <span className={styles.highlight}>
            Dra. María del Carmen Gómez Fuentes
          </span>{" "}
          y <span className={styles.highlight}>Dr. Jorge Cervantes Ojeda</span>
        </Typography>
      </Box>

      <Box className={styles.section}>
        <Typography variant="body2" align="center" className={styles.text}>
          Desarrollador:{" "}
          <span className={styles.highlight}>Jorge Infante Fragoso</span>
        </Typography>
      </Box>

      <Typography variant="caption" align="center" className={styles.subfooter}>
        Triangular Chess - Plataforma Educativa
      </Typography>
    </Box>
  );
};

export default Footer;
