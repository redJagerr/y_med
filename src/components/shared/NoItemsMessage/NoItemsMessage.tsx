import cn from 'classnames';

import styles from './NoItemsMessage.module.scss';

interface NoItemsMessageProps {
  className?: string;
  children: string;
}

const NoItemsMessage = ({ className, children = '' }: NoItemsMessageProps) => (
  <h3 className={cn(styles.title, className)}>{children}</h3>
);

export default NoItemsMessage;
