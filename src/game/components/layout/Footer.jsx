import styles from "@styles/components/layout/Footer.module.css";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Typography variant="body2" align="center" className={styles.text}>
        Copyright © Universidad Autónoma Metropolitana 2025
      </Typography>
      <Typography variant="body2" align="center" className={styles.text}>
        Responsables del sitio: Dra. María del Carmen Gómez Fuentes y Dr. Jorge
        Cervantes Ojeda
      </Typography>

      <Typography variant="body2" align="center" className={styles.text}>
        Desarrollador: Jorge Infante Fragoso
      </Typography>
    </Box>
  );
};

export default Footer;
