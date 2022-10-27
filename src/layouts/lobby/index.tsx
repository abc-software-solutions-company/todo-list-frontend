import React from 'react';

import styles from './style.module.scss';

export default function LobbyLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  return <div className={styles['layout-lobby']}>{children}</div>;
}
