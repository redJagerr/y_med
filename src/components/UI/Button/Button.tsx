import cn from 'classnames';

import { bindStyles } from '@/src/utils/helpers/bindStyles';

import styles from './Button.module.scss';

export interface ButtonProps {
  size?: 'standart' | 'small';
  type?: 'default' | 'outline' | 'link';
  children?: React.ReactNode;
  className?: string | null;
  disabled?: boolean;
  onClick?: () => void;
}

const cx = bindStyles(styles);

const Button = ({
  children,
  className = null,
  onClick,
  disabled = false,
  type = 'default',
  size = 'standart'
}: ButtonProps) => (
  <button
    disabled={disabled}
    className={cn(
      className,
      cx('common', {
        default: type === 'default',
        link: type === 'link',
        outline: type === 'outline',
        standart: size === 'standart',
        small: size === 'small',
        disabled
      })
    )}
    onClick={onClick}
  >
    {children || 'Кнопка'}
  </button>
);

export default Button;
