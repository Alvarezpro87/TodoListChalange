import Image from "next/image";
import Logo from "../../assets/logoMark.png";
import styles from './Header.module.scss'; 

export default function Header() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
  return (
    <header className={styles.header}> 
      <Image src={Logo} alt="focal" width={150} height={36} />
      <p className={styles.greeting}>Bem-vindo de volta, Marcus</p> 
      <p className={styles.date}>{currentDate}</p> 
    </header>
  );
}
