import { ReactNode } from 'react'
import styles from './PageLayout.module.scss'

interface PageLayoutProps{
    children : ReactNode
}

export const PageLayout = ({children} : PageLayoutProps) => {
    return(
        <div className={styles.layout}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}