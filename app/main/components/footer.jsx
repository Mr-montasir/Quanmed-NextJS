import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div className="links_left"> 
                <Link href="#">Roadmap</Link>
                <Link href="https://twitter.com/QuanMedAI">Twitter</Link>
                <Link href="https://github.com/quanmedai">GitHub</Link>
                <Link href="#">Trade</Link>
                <Link href="https://t.me/QuanMedAI/1">Telegram</Link> 
            </div>
            <span className='copyright'>Copyright QuanMed AI 2023</span>
        </footer>
    )
}