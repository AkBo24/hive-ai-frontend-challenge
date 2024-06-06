import styles from './page.module.css';
import ControlledDropdown from '@/components/ControlledDropdown';
import UncontrolledDropdown from '@/components/UncontrolledDropdown';

export default function Home() {
    return (
        <main className={styles.main}>
            <h1 style={{ marginBottom: '2rem' }}>
                Hive.AI Frontend Challenge - Akshay Bodla
            </h1>
            <div className={styles.dropdowns}>
                <UncontrolledDropdown />
                <ControlledDropdown />
            </div>
        </main>
    );
}
