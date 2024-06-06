import Image from 'next/image';
import styles from './page.module.css';
import Dropdown from '@/components/Dropdown/Dropdown';

export default function Home() {
    return (
        <main className={styles.main}>
            <Dropdown
                label='Color'
                placeholder='Select...'
                options={['red', 'blue', 'red']}
            />
        </main>
    );
}
