import styles from './page.module.scss';
import { Main } from "@/features/main/components/Main.component";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <Main />
      </main>
    </div>
  );
}
