import Image from 'next/image';
import styles from './page.module.css';
import Dropdown from '@/components/Dropdown/Dropdown';

export default function Home() {
    return (
        <main className={styles.main}>
            <h1 style={{ marginBottom: '2rem' }}>
                Hive.AI Frontend Challenge - Akshay Bodla
            </h1>
            <Dropdown<string>
                label='Color (Uncontrolled & Single Select)'
                placeholder='Select...'
                options={['red', 'blue', 'red', 'orange']}
            />
        </main>
    );
}
