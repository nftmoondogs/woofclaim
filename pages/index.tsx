import Image from 'next/image';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/SearchPage.module.css'; // Import the CSS module

function SearchPage() {
    const [walletAddress, setWalletAddress] = useState('');
    const [claimUrl, setClaimUrl] = useState('');
    const [isEligible, setIsEligible] = useState(false);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        const jsonFiles = [...Array(100).keys()].map(i => `/jsons/data${i + 1}.json`);
        let found = false;

        for (let file of jsonFiles) {
            const response = await fetch(file);
            const data = await response.json();
            const entry = data.find(entry => entry.handle === walletAddress);
            if (entry) {
                setClaimUrl(entry.url);
                setIsEligible(true);
                setMessage('');
                found = true;
                break;
            }
        }

        if (!found) {
            setIsEligible(false);
            setMessage('You are not eligible for this airdrop.');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Token Claim Search</title>
            </Head>

            <Image src="https://i.ibb.co/wYPcMDT/woof.png" alt="Woof" width={200} height={200} className={styles.image} />

            <div className={styles.searchBox}>
                <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your Solana wallet address"
                    className={styles.inputField}
                />
                <button onClick={handleSearch} className={styles.searchButton}>Search Wallet</button>
            </div>

            {message && <p className={styles.message}>{message}</p>}

            {isEligible && (
                <a href={claimUrl} target="_blank" rel="noopener noreferrer">
                    <button className={styles.claimButton}>Claim Tokens</button>
                </a>
            )}
        </div>
    );
}

export default SearchPage;
